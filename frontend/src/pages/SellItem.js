import React, { useState, useRef } from 'react';
import { Plus, Trash2, ImagePlus, Save, CheckCircle, Info, AlertCircle } from 'lucide-react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import TitleBar from '../components/TitleBar';
import Sidebar from '../components/SideBar';
import { Navigate, useNavigate } from 'react-router-dom';

const ItemListingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    key_details: [''],
    sizes: [''],
    category: [],
    stock: 0,
    discount: {
      percentage: 0,
      validUntil: null
    }
  });

  const [images, setImages] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null
  });
  const imageInputRef = useRef(null);

  const categories = [
    'Electronics', 'Clothing', 'Books', 
    'Sports', 'Grocery', 'Others'
  ];

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Item name is required';
    } else if (formData.name.length < 2 || formData.name.length > 300) {
      errors.name = 'Name must be between 2 and 300 characters';
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    } else if (formData.description.length < 3 || formData.description.length > 1000) {
      errors.description = 'Description must be between 3 and 1000 characters';
    }

    if (parseFloat(formData.price) <= 0) {
      errors.price = 'Price must be greater than zero';
    }

    if (formData.stock < 0) {
      errors.stock = 'Stock cannot be negative';
    }

    if (formData.category.length === 0) {
      errors.category = 'Select at least one category';
    }

    if (formData.discount.percentage) {
      const discountPercentage = parseFloat(formData.discount.percentage);
      if (isNaN(discountPercentage) || discountPercentage < 0 || discountPercentage > 100) {
        errors.discountPercentage = 'Discount must be between 0 and 100';
      }

      if (formData.discount.validUntil) {
        const discountDate = new Date(formData.discount.validUntil);
        if (discountDate < new Date()) {
          errors.discountDate = 'Discount date must be in the future';
        }
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleDiscountChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      discount: {
        ...prev.discount,
        [name]: value
      }
    }));

    if (validationErrors[`discount${name.charAt(0).toUpperCase() + name.slice(1)}`]) {
      setValidationErrors(prev => ({ 
        ...prev, 
        [`discount${name.charAt(0).toUpperCase() + name.slice(1)}`]: undefined 
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear specific validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleKeyDetailChange = (index, value) => {
    const newKeyDetails = [...formData.key_details];
    newKeyDetails[index] = value;
    setFormData(prev => ({ ...prev, key_details: newKeyDetails }));
  };

  const addKeyDetail = () => {
    setFormData(prev => ({
      ...prev,
      key_details: [...prev.key_details, '']
    }));
  };

  const removeKeyDetail = (index) => {
    const newKeyDetails = formData.key_details.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, key_details: newKeyDetails }));
  };

  const handleCategoryChange = (category) => {
    setFormData(prev => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter(cat => cat !== category)
        : [...prev.category, category]
    }));
    // Clear category validation error
    if (validationErrors.category) {
      setValidationErrors(prev => ({ ...prev, category: undefined }));
    }
  };

  // const handleImageUpload = (e) => {
  //   const files = Array.from(e.target.files);
  //   const newImages = files.map(file => URL.createObjectURL(file));
  //   setImages(prev => [...prev, ...newImages]);
  // };
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // reader.result contains the base64 string
        setImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset submit status
    setSubmitStatus({ loading: true, success: false, error: null });

    if (validateForm()) {
      try {
        // Prepare data for submission
        const submissionData = {
          ...formData,
          price: parseFloat(formData.price),
          // Convert key details and sizes to empty array if they're just ['']
          key_details: formData.key_details[0] ? formData.key_details : [],
          sizes: formData.sizes[0] ? formData.sizes : [],
          discount: (formData.discount.percentage && parseFloat(formData.discount.percentage) > 0) 
            ? {
                percentage: parseFloat(formData.discount.percentage),
                validUntil: formData.discount.validUntil ? new Date(formData.discount.validUntil) : null
              } 
            : undefined,
            images: images, // Send the array of base64 strings
        };

        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const user1 = localStorage.getItem('user') || sessionStorage.getItem('user');

        if(!token || !user1) {
          navigate("/login");
          return;
        }

        // console.log(JSON.parse(user1));

        let parsedUser;
        try {
          parsedUser = JSON.parse(user1);  // Ensure proper parsing
        } catch (error) {
          console.error("Error parsing user data:", error);
          return;
        }

        const response = await axios.post('http://localhost:4000/list/api/add', submissionData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`, 
            User_Data: JSON.stringify(parsedUser) 
          }
        });

        setSubmitStatus({ 
          loading: false, 
          success: true, 
          error: null 
        });

        // Optional: Reset form after successful submission
        setFormData({
          name: '',
          price: '',
          description: '',
          key_details: [''],
          sizes: [''],
          category: [],
          stock: 0,
          discount: {
            percentage: '',
            validUntil: ''
          }
        });
        setImages([]);

        // Optional: Show success message or redirect
        alert('Item listed successfully!');
      } catch (error) {
        setSubmitStatus({ 
          loading: false, 
          success: false, 
          error: error.response?.data?.error || 'An error occurred' 
        });

        // Optional: Show error message
        alert(error.response?.data?.error || 'Failed to list item');
      }
    } else {
      setSubmitStatus({ loading: false, success: false, error: null });
    }
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     setSubmitStatus({ loading: true, success: false, error: null });

//     if (validateForm()) {
//       try {
//         const formDataToSend = new FormData();
        
//         // Append all form fields
//         formDataToSend.append('name', formData.name);
//         formDataToSend.append('price', formData.price);
//         formDataToSend.append('description', formData.description);
//         formDataToSend.append('key_details', JSON.stringify(formData.key_details));
//         formDataToSend.append('sizes', JSON.stringify(formData.sizes));
//         formDataToSend.append('category', JSON.stringify(formData.category));
//         formDataToSend.append('stock', formData.stock);
        
//         if (formData.discount.percentage && parseFloat(formData.discount.percentage) > 0) {
//           formDataToSend.append('discount', JSON.stringify({
//             percentage: parseFloat(formData.discount.percentage),
//             validUntil: formData.discount.validUntil ? new Date(formData.discount.validUntil) : null
//           }));
//         }

//         // Append image files
//         const fileList = document.querySelector('input[type="file"]').files;
//         for (let i = 0; i < fileList.length; i++) {
//           formDataToSend.append('images', fileList[i]);
//         }

//         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//         const user1 = localStorage.getItem('user') || sessionStorage.getItem('user');
//         const parsedUser = JSON.parse(user1);

//         const response = await axios.post('http://localhost:4000/list/api/add', 
//           formDataToSend,
//           {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//               'Authorization': `${token}`,
//               User_Data: JSON.stringify(parsedUser)
//             }
//           }
//         );

//         setSubmitStatus({ loading: false, success: true, error: null });
        
//         // Reset form
//         setFormData({
//           name: '',
//           price: '',
//           description: '',
//           key_details: [''],
//           sizes: [''],
//           category: [],
//           stock: 0,
//           discount: {
//             percentage: '',
//             validUntil: ''
//           }
//         });
//         setImages([]);
        
//         alert('Item listed successfully!');
//       } catch (error) {
//         setSubmitStatus({ 
//           loading: false, 
//           success: false, 
//           error: error.response?.data?.error || 'An error occurred' 
//         });
//         alert(error.response?.data?.error || 'Failed to list item');
//       }
//     } else {
//       setSubmitStatus({ loading: false, success: false, error: null });
//     }
// };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Sidebar />
      <TitleBar title="List Item" />
      {/* <ChatBot /> */}
    <div className="container absolute left-16 mt-24 ml-24">
    {/* <div className="container-fluid mt-4"> */}
      <div className="card shadow-lg border-0">
        {/* <div className="card-header bg-primary text-white d-flex align-items-center">
          <ImagePlus size={24} className="me-3" />
          <h2 className="mb-0">List New Item</h2>
        </div> */}
        <form onSubmit={handleSubmit} className="card-body">
          <div className="row">
            <div className="col-md-8">
              <div className="mb-3">
                <label className="form-label d-flex align-items-center">
                  <Info size={16} className="me-2 text-primary" />
                  Item Name
                </label>
                <input
                  type="text"
                  className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  minLength={2}
                  maxLength={300}
                />
                {validationErrors.name && (
                  <div className="invalid-feedback d-flex align-items-center">
                    <AlertCircle size={16} className="me-2" />
                    {validationErrors.name}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label d-flex align-items-center">
                  <Info size={16} className="me-2 text-primary" />
                  Description
                </label>
                <textarea
                  className={`form-control ${validationErrors.description ? 'is-invalid' : ''}`}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  minLength={3}
                  maxLength={1000}
                  rows="4"
                />
                {validationErrors.description && (
                  <div className="invalid-feedback d-flex align-items-center">
                    <AlertCircle size={16} className="me-2" />
                    {validationErrors.description}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label d-flex align-items-center">
                  <CheckCircle size={16} className="me-2 text-primary" />
                  Key Details
                </label>
                {formData.key_details.map((detail, index) => (
                  <div key={index} className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      value={detail}
                      onChange={(e) => handleKeyDetailChange(index, e.target.value)}
                      placeholder={`Detail ${index + 1}`}
                    />
                    {formData.key_details.length > 1 && (
                      <button 
                        type="button" 
                        className="btn btn-outline-danger" 
                        onClick={() => removeKeyDetail(index)}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button 
                  type="button" 
                  className="btn btn-outline-secondary" 
                  onClick={addKeyDetail}
                >
                  <Plus size={16} className="me-2" />
                  Add Detail
                </button>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Price</label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      className={`form-control ${validationErrors.price ? 'is-invalid' : ''}`}
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      required
                    />
                    {validationErrors.price && (
                      <div className="invalid-feedback d-flex align-items-center">
                        <AlertCircle size={16} className="me-2" />
                        {validationErrors.price}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Stock</label>
                  <input
                    type="number"
                    className={`form-control ${validationErrors.stock ? 'is-invalid' : ''}`}
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                  {validationErrors.stock && (
                    <div className="invalid-feedback d-flex align-items-center">
                      <AlertCircle size={16} className="me-2" />
                      {validationErrors.stock}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-3">
                  <label className="form-label">Discount (Optional) and Valid Until (date)</label>
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <div className="input-group">
                        <input
                          type="number"
                          className={`form-control ${validationErrors.discountPercentage ? 'is-invalid' : ''}`}
                          name="percentage"
                          value={formData.discount.percentage}
                          onChange={handleDiscountChange}
                          min="0"
                          max="100"
                          placeholder="Discount Percentage"
                        />
                        <span className="input-group-text">%</span>
                        {validationErrors.discountPercentage && (
                          <div className="invalid-feedback">
                            {validationErrors.discountPercentage}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="date"
                        className={`form-control ${validationErrors.discountDate ? 'is-invalid' : ''}`}
                        name="validUntil"
                        value={formData.discount.validUntil}
                        onChange={handleDiscountChange}
                      />
                      {validationErrors.discountDate && (
                        <div className="invalid-feedback">
                          {validationErrors.discountDate}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              <div className="mb-3">
                <label className="form-label d-flex align-items-center">
                  <CheckCircle size={16} className="me-2 text-primary" />
                  Categories
                </label>
                <div className="d-flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <div 
                      key={cat} 
                      className={`btn btn-${
                        formData.category.includes(cat) 
                          ? 'primary' 
                          : 'outline-secondary'
                      }`}
                      onClick={() => handleCategoryChange(cat)}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
                {validationErrors.category && (
                  <div className="text-danger d-flex align-items-center mt-2">
                    <AlertCircle size={16} className="me-2" />
                    {validationErrors.category}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Images</label>
                <div className="d-flex flex-wrap gap-2 mb-2">
                  {images.map((image, index) => (
                    <div key={index} className="position-relative">
                      <img 
                        src={image} 
                        alt={`upload-${index}`} 
                        style={{ 
                          width: '100px', 
                          height: '100px', 
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }} 
                      />
                      <button
                        type="button"
                        className="btn btn-danger btn-sm position-absolute top-0 end-0"
                        onClick={() => removeImage(index)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  {images.length === 0 && (
                    <div 
                      className="border-dashed p-3 text-center w-100 text-muted"
                      style={{ 
                        borderWidth: '2px', 
                        borderColor: '#dee2e6', 
                        borderRadius: '8px' 
                      }}
                    >
                      No images uploaded
                    </div>
                  )}
                </div>
                <div className="input-group">
                  <input
                    type="file"
                    ref={imageInputRef}
                    className="form-control"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    hidden
                  />
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary w-100"
                    onClick={() => imageInputRef.current.click()}
                  >
                    <ImagePlus size={16} className="me-2" />
                    Upload Images
                  </button>
                </div>
              </div>

              {/* <div className="text-center w-100">
                <button 
                  type="submit" 
                  className="btn btn-success btn-lg px-5 shadow w-100 flex-row items-center justify-content-center"
                >
                  <Save size={20} className="mr-3" />
                  List Item
                </button>
              </div> */}

              <div className="w-full max-w-2xl mx-auto mt-8 mb-4">
                <button 
                  type="submit" 
                  // disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Save className="w-6 h-6" />
                  <span className="text-lg font-semibold">
                    List Item
                  </span>
                </button>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card bg-light border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title d-flex align-items-center">
                    <Info size={20} className="me-2 text-primary" />
                    Quick Tips
                  </h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-transparent">
                      <CheckCircle size={16} className="me-2 text-success" />
                      Use descriptive names
                    </li>
                    <li className="list-group-item bg-transparent">
                      <CheckCircle size={16} className="me-2 text-success" />
                      Add multiple key details
                    </li>
                    <li className="list-group-item bg-transparent">
                      <CheckCircle size={16} className="me-2 text-success" />
                      Upload clear images
                    </li>
                    <li className="list-group-item bg-transparent">
                      <CheckCircle size={16} className="me-2 text-success" />
                      Set competitive pricing
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ItemListingForm;