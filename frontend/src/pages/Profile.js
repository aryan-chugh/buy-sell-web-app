// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';
// // // import { useNavigate } from 'react-router-dom';
// // // import { Save, Edit3 } from 'lucide-react';
// // // import Sidebar from '../components/SideBar';
// // // import TitleBar from '../components/TitleBar';

// // // const ProfilePage = () => {
// // //   const navigate = useNavigate();
// // //   const [bioData, setBioData] = useState([]);
// // //   const [projects, setProjects] = useState([]);
// // //   const [editMode, setEditMode] = useState(false);

// // //   useEffect(() => {
// // //     const fetchProfileData = async () => {
// // //       try {
// // //         // const token = localStorage.getItem('token') || sessionStorage.getItem('token');
// // //         // const user = localStorage.getItem('{email}') || sessionStorage.getItem('{email}')
// // //         // // console.log(token);

// // //         // if (!token) {
// // //         //   navigate('/login');
// // //         //   return;
// // //         // }

// // //         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
// // //         const user1 = localStorage.getItem('user') || sessionStorage.getItem('user');

// // //         // console.log(JSON.parse(user1));

// // //         let parsedUser;
// // //         try {
// // //           parsedUser = JSON.parse(user1);  // Ensure proper parsing
// // //         } catch (error) {
// // //           console.error("Error parsing user data:", error);
// // //           return;
// // //         }

// // //         const response = await axios.get('http://localhost:4000/profile', {
// // //           headers: { Authorization: `${token}`, User_Data: JSON.stringify(parsedUser) },
// // //           params: {
// // //             filter: JSON.stringify(user1), // Your JSON object
// // //           },
// // //         });

// // //         setBioData(response.data.bioData);
// // //         // setProjects(response.data.projects);
// // //       } catch (error) {
// // //         console.error(error.message);
// // //         navigate('/login');
// // //       }
// // //     };

// // //     fetchProfileData();
// // //   }, [navigate]);

// // //   const handleChange = (index, newValue) => {
// // //     const newBioData = [...bioData];
// // //     newBioData[index].value = newValue;
// // //     setBioData(newBioData);
// // //   };

// // //   const handleToggleEditMode = () => setEditMode(!editMode);

// // //   return (
// // //     <div className="min-h-screen bg-gray-100">
// // //       <Sidebar />
// // //       <TitleBar />

// // //       <div className="ml-[9%] pt-32 p-6">
// // //         <div className="container mx-auto">
// // //           <div className="flex flex-col md:flex-row gap-6">
// // //             <div className="md:w-1/3">
// // //               <div className="bg-white rounded-lg shadow">
// // //                 <div className="bg-yellow-500 rounded-t-lg p-12 text-center text-white relative">
// // //                   <img
// // //                     src="/api/placeholder/160/160"
// // //                     alt="Profile"
// // //                     className="w-40 h-40 rounded-full border-8 border-white/30 inline-block"
// // //                   />
// // //                   <h1 className="text-3xl font-light mb-2">Camila Smith</h1>
// // //                   <p className="text-lg">jsmith@flatlab.com</p>
// // //                   <button
// // //                     onClick={handleToggleEditMode}
// // //                     className={`w-full flex items-center justify-center gap-2 p-3 rounded text-lg ${
// // //                       editMode
// // //                         ? 'bg-green-500 text-white hover:bg-green-600'
// // //                         : 'bg-yellow-500 text-white hover:bg-yellow-600'
// // //                     }`}
// // //                   >
// // //                     {editMode ? (
// // //                       <>
// // //                         <Save size={20} />
// // //                         Save Changes
// // //                       </>
// // //                     ) : (
// // //                       <>
// // //                         <Edit3 size={20} />
// // //                         Edit Profile
// // //                       </>
// // //                     )}
// // //                   </button>
// // //                 </div>

// // //                 <div className="p-6">
// // //                   <div className="grid md:grid-cols-2 gap-6">
// // //                     {bioData.map((item, index) => (
// // //                       <div key={index}>
// // //                         <label className="block text-sm font-medium text-gray-600 mb-1">
// // //                           {item.label}
// // //                         </label>
// // //                         <input
// // //                           type="text"
// // //                           value={item.value}
// // //                           onChange={(e) => handleChange(index, e.target.value)}
// // //                           readOnly={!editMode}
// // //                           className={`w-full p-3 border rounded-lg ${
// // //                             editMode
// // //                               ? 'bg-white focus:ring-2 focus:ring-yellow-500'
// // //                               : 'bg-gray-50'
// // //                           }`}
// // //                         />
// // //                       </div>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <div className="md:w-3/4">
// // //               <div className="bg-white rounded-lg shadow">
// // //                 <div className="bg-yellow-500 p-8 rounded-t-lg text-white text-center italic">
// // //                   Current Projects and Progress Overview
// // //                 </div>
// // //                 <div className="grid md:grid-cols-2 gap-6 p-6">
// // //                   {projects.map((project, index) => (
// // //                     <div key={index} className="bg-gray-50 rounded-lg p-6">
// // //                       <h4 className="text-xl font-medium text-yellow-500 mb-3">{project.name}</h4>
// // //                       <p className="text-gray-600 mb-1">Started: {project.startDate}</p>
// // //                       <p className="text-gray-600">Deadline: {project.deadline}</p>
// // //                       <div className="relative w-32 h-32">
// // //                         <div
// // //                           className="absolute inset-0 rounded-full border-8 border-gray-100"
// // //                           style={{
// // //                             background: `conic-gradient(${project.color} ${project.progress}%, #e8e8e8 0)`
// // //                           }}
// // //                         />
// // //                         <div className="absolute inset-0 flex items-center justify-center">
// // //                           <span className="text-xl font-bold text-yellow-500">
// // //                             {project.progress}%
// // //                           </span>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ProfilePage;
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import { Save, Edit3, User, Mail, Calendar, Briefcase } from 'lucide-react';
// // import { toast, Toaster } from 'react-hot-toast';

// // interface BioDataItem {
// //   label: string;
// //   value: string;
// //   icon?: React.ComponentType;
// // }

// // interface Project {
// //   name: string;
// //   startDate: string;
// //   deadline: string;
// //   progress: number;
// //   color: string;
// // }

// // const ProfilePage: React.FC = () => {
// //   const navigate = useNavigate();
// //   const [bioData, setBioData] = useState<BioDataItem[]>([]);
// //   const [projects, setProjects] = useState<Project[]>([]);
// //   const [editMode, setEditMode] = useState(false);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [user, setUser] = useState({ name: '', email: '', avatar: '' });

// //   useEffect(() => {
// //     const fetchProfileData = async () => {
// //       try {
// //         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
// //         const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');

// //         if (!token || !storedUser) {
// //           navigate('/login');
// //           return;
// //         }

// //         const parsedUser = JSON.parse(storedUser);
// //         setUser({
// //           name: parsedUser.name || 'User',
// //           email: parsedUser.email || '',
// //           avatar: parsedUser.avatar || '/api/placeholder/160/160'
// //         });

// //         const response = await axios.get('http://localhost:4000/profile', {
// //           headers: { 
// //             Authorization: `${token}`, 
// //             'Content-Type': 'application/json'
// //           },
// //           params: { userId: parsedUser.id }
// //         });

// //         setBioData([
// //           { label: 'Full Name', value: parsedUser.name || '', icon: User },
// //           { label: 'Email', value: parsedUser.email || '', icon: Mail },
// //           { label: 'Join Date', value: parsedUser.joinDate || '', icon: Calendar },
// //         ]);

// //         setProjects(response.data.projects || []);
// //         setIsLoading(false);
// //       } catch (error) {
// //         toast.error('Failed to load profile');
// //         navigate('/login');
// //       }
// //     };

// //     fetchProfileData();
// //   }, [navigate]);

// //   const handleSaveProfile = async () => {
// //     try {
// //       const token = localStorage.getItem('token') || sessionStorage.getItem('token');
// //       await axios.put('http://localhost:4000/profile', 
// //         { bioData },
// //         { headers: { Authorization: `${token}` } }
// //       );
// //       toast.success('Profile updated successfully');
// //       setEditMode(false);
// //     } catch (error) {
// //       toast.error('Failed to update profile');
// //     }
// //   };

// //   const handleChange = (index: number, newValue: string) => {
// //     const newBioData = [...bioData];
// //     newBioData[index].value = newValue;
// //     setBioData(newBioData);
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="flex justify-center items-center min-h-screen">
// //         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-yellow-500"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
// //       <Toaster position="top-right" />
      
// //       <div className="container mx-auto px-4 py-12">
// //         <div className="grid md:grid-cols-3 gap-8">
// //           {/* Profile Card */}
// //           <div className="md:col-span-1">
// //             <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
// //               <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 text-center text-white relative">
// //                 <img
// //                   src={user.avatar}
// //                   alt="Profile"
// //                   className="w-40 h-40 rounded-full border-4 border-white/30 mx-auto mb-4 object-cover"
// //                 />
// //                 <h1 className="text-2xl font-semibold">{user.name}</h1>
// //                 <p className="text-sm opacity-80">{user.email}</p>
// //               </div>

// //               <div className="p-6">
// //                 {bioData.map((item, index) => {
// //                   const IconComponent = item.icon || Briefcase;
// //                   return (
// //                     <div key={index} className="flex items-center mb-4">
// //                       <IconComponent className="mr-3 text-yellow-500" size={20} />
// //                       <div className="flex-grow">
// //                         <label className="block text-xs text-gray-500">{item.label}</label>
// //                         {editMode ? (
// //                           <input
// //                             type="text"
// //                             value={item.value}
// //                             onChange={(e) => handleChange(index, e.target.value)}
// //                             className="w-full border-b border-yellow-500 focus:outline-none"
// //                           />
// //                         ) : (
// //                           <p className="font-medium">{item.value}</p>
// //                         )}
// //                       </div>
// //                     </div>
// //                   );
// //                 })}

// //                 <button
// //                   onClick={editMode ? handleSaveProfile : () => setEditMode(true)}
// //                   className={`w-full mt-4 flex items-center justify-center gap-2 p-3 rounded-lg transition ${
// //                     editMode 
// //                       ? 'bg-green-500 hover:bg-green-600 text-white' 
// //                       : 'bg-yellow-500 hover:bg-yellow-600 text-white'
// //                   }`}
// //                 >
// //                   {editMode ? (
// //                     <>
// //                       <Save size={20} />
// //                       Save Changes
// //                     </>
// //                   ) : (
// //                     <>
// //                       <Edit3 size={20} />
// //                       Edit Profile
// //                     </>
// //                   )}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Projects Section */}
// //           <div className="md:col-span-2">
// //             <div className="bg-white rounded-xl shadow-2xl">
// //               <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 text-white">
// //                 <h2 className="text-2xl font-semibold text-center">
// //                   Current Projects and Progress
// //                 </h2>
// //               </div>
              
// //               {projects.length > 0 ? (
// //                 <div className="grid md:grid-cols-2 gap-6 p-6">
// //                   {projects.map((project, index) => (
// //                     <div 
// //                       key={index} 
// //                       className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition"
// //                     >
// //                       <h4 className="text-xl font-medium text-yellow-600 mb-3">
// //                         {project.name}
// //                       </h4>
// //                       <div className="flex justify-between mb-4">
// //                         <p className="text-gray-600">Started: {project.startDate}</p>
// //                         <p className="text-gray-600">Deadline: {project.deadline}</p>
// //                       </div>
// //                       <div className="relative w-32 h-32 mx-auto">
// //                         <div
// //                           className="absolute inset-0 rounded-full border-8 border-gray-100"
// //                           style={{
// //                             background: `conic-gradient(${project.color} ${project.progress}%, #e8e8e8 0)`
// //                           }}
// //                         />
// //                         <div className="absolute inset-0 flex items-center justify-center">
// //                           <span className="text-xl font-bold text-yellow-600">
// //                             {project.progress}%
// //                           </span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               ) : (
// //                 <div className="text-center p-12 text-gray-500">
// //                   No active projects at the moment
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProfilePage;
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import { Edit3, Save, X, Check, Star } from 'lucide-react';
// // import { toast, Toaster } from 'react-hot-toast';
// // import Sidebar from '../components/SideBar';
// // import TitleBar from '../components/TitleBar';

// // const ProfilePage = () => {
// //   const navigate = useNavigate();
// //   const [editMode, setEditMode] = useState(false);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [profileData, setProfileData] = useState({
// //     contact: '+91 8360769128',
// //     createdAt: '2025-02-03T16:11:38.644Z',
// //     describe: 'Enthusiast',
// //     dob: '2005-07-07T00:00:00.000Z',
// //     email: 'aryan.chugh@students.iiit.ac.in',
// //     first_name: 'Aryan',
// //     last_name: 'Chugh',
// //     avatar: '/api/placeholder/160/160'
// //   });

// //   const formatDate = (dateString, type = 'default') => {
// //     const date = new Date(dateString);
// //     if (type === 'dob') {
// //       return date.toLocaleDateString('en-US', {
// //         year: 'numeric',
// //         month: 'long',
// //         day: 'numeric'
// //       });
// //     }
// //     return date.toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'short',
// //       day: 'numeric'
// //     });
// //   };

// //   useEffect(() => {
// //     const fetchProfileData = async () => {
// //       try {
// //         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
// //         if (!token) {
// //           navigate('/login');
// //           return;
// //         }
// //         setIsLoading(false);
// //       } catch (error) {
// //         toast.error('Failed to load profile');
// //         navigate('/login');
// //       }
// //     };

// //     fetchProfileData();
// //   }, [navigate]);

// //   const handleSaveProfile = async () => {
// //     try {
// //       const token = localStorage.getItem('token') || sessionStorage.getItem('token');
// //       await axios.put('http://localhost:4000/profile', 
// //         { profileData },
// //         { headers: { Authorization: `${token}` } }
// //       );
// //       toast.success('Profile updated successfully');
// //       setEditMode(false);
// //     } catch (error) {
// //       toast.error('Failed to update profile');
// //     }
// //   };

// //   const handleChange = (key, value) => {
// //     setProfileData(prev => ({ ...prev, [key]: value }));
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="flex justify-center items-center min-h-screen">
// //         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
// //       <Sidebar />
// //       <TitleBar />
// //       <Toaster position="top-right" />
      
// //       <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex overflow-hidden">
// //         <div className="w-1/3 relative bg-gradient-to-b from-blue-600 to-blue-700 p-6">
// //           <div className="absolute top-4 right-4 bg-yellow-400 text-white px-3 py-1 rounded-full flex items-center">
// //             <Star className="mr-1" size={16} />
// //             <span className="text-sm font-bold">5.0</span>
// //           </div>
          
// //           <div className="flex flex-col items-center justify-center h-full">
// //             <img
// //               src={profileData.avatar}
// //               alt="Profile"
// //               className="w-48 h-48 rounded-full border-4 border-white/30 object-cover shadow-lg mb-6"
// //             />
// //             <h1 className="text-2xl font-bold text-white tracking-wide">
// //               {profileData.first_name} {profileData.last_name}
// //             </h1>
// //             <p className="text-sm text-white/80 mt-2">{profileData.describe}</p>
// //           </div>
// //         </div>

// //         <div className="w-2/3 p-8">
// //           <div className="flex justify-between items-center mb-6">
// //             <h2 className="text-2xl font-bold text-gray-800">Profile Details</h2>
// //             <div className="flex space-x-2">
// //               <button
// //                 onClick={editMode ? handleSaveProfile : () => setEditMode(true)}
// //                 className={`flex items-center justify-center gap-2 p-2 rounded-lg transition ${
// //                   editMode 
// //                     ? 'bg-green-500 hover:bg-green-600 text-white' 
// //                     : 'bg-blue-500 hover:bg-blue-600 text-white'
// //                 }`}
// //               >
// //                 {editMode ? (
// //                   <>
// //                     <Check size={20} />
// //                     Save
// //                   </>
// //                 ) : (
// //                   <>
// //                     <Edit3 size={20} />
// //                     Edit
// //                   </>
// //                 )}
// //               </button>
// //               {editMode && (
// //                 <button
// //                   onClick={() => setEditMode(false)}
// //                   className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
// //                 >
// //                   <X size={20} />
// //                 </button>
// //               )}
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-2 gap-6">
// //             {Object.entries({
// //               first_name: 'First Name',
// //               last_name: 'Last Name',
// //               email: 'Email',
// //               contact: 'Contact',
// //               dob: 'Date of Birth',
// //               createdAt: 'Account Created',
// //               describe: 'Description'
// //             }).map(([key, label]) => (
// //               <div key={key} className="group">
// //                 <label className="block text-xs text-gray-500 mb-1">{label}</label>
// //                 {editMode && key !== 'createdAt' ? (
// //                   <input
// //                     type={key === 'dob' || key === 'createdAt' ? 'date' : 'text'}
// //                     value={key === 'dob' || key === 'createdAt' 
// //                       ? new Date(profileData[key]).toISOString().split('T')[0] 
// //                       : profileData[key]}
// //                     onChange={(e) => handleChange(key, e.target.value)}
// //                     className="w-full border-b border-blue-500 focus:outline-none pb-1"
// //                   />
// //                 ) : (
// //                   <p className="font-medium text-gray-700">
// //                     {key === 'dob' 
// //                       ? formatDate(profileData[key], 'dob') 
// //                       : key === 'createdAt' 
// //                       ? formatDate(profileData[key]) 
// //                       : profileData[key]}
// //                   </p>
// //                 )}
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProfilePage;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Edit3, Check, X, Star } from 'lucide-react';
// import { toast, Toaster } from 'react-hot-toast';
// import Sidebar from '../components/SideBar';
// import TitleBar from '../components/TitleBar';

// const ProfilePage = () => {
//   const navigate = useNavigate();
//   const [editMode, setEditMode] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [profileData, setProfileData] = useState({});

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//         const user1 = localStorage.getItem('user') || sessionStorage.getItem('user');

//         let parsedUser;
//         try {
//           parsedUser = JSON.parse(user1);
//         } catch (error) {
//           console.error("Error parsing user data:", error);
//           navigate('/login');
//           return;
//         }

//         if (!token || !user1) {
//           // setLoading(false);
//           // setError('No authentication token or user data found.');
//           navigate('/login');
//           return;
//         }

//         const { data } = await axios.get('http://localhost:4000/profile/get', {
//           headers: { Authorization: token, User_Data: JSON.stringify(parsedUser) }
//         });
//         setProfileData(data);
//         setIsLoading(false);
//       } catch (error) {
//         toast.error('Failed to load profile');
//         navigate('/login');
//       }
//     };
//     fetchProfileData();
//   }, [navigate]);

//   const handleSaveProfile = async () => {
//     const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//     const user1 = localStorage.getItem('user') || sessionStorage.getItem('user');

//     let parsedUser;
//     try {
//       parsedUser = JSON.parse(user1);
//     } catch (error) {
//       console.error("Error parsing user data:", error);
//       navigate('/login');
//       return;
//     }

//     if (!token || !user1) {
//       // setLoading(false);
//       // setError('No authentication token or user data found.');
//       navigate('/login');
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//       await axios.put('http://localhost:4000/profile/update', profileData, {
//         headers: { Authorization: token, User_Data: JSON.stringify(parsedUser) }
//       });
//       toast.success('Profile updated successfully');
//       setEditMode(false);
//     } catch (error) {
//       toast.error('Failed to update profile');
//     }
//   };

//   const handleChange = (key, value) => {
//     setProfileData(prev => ({ ...prev, [key]: value }));
//   };

//   if (isLoading) return <div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div></div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
//       <Sidebar />
//       <TitleBar />
//       <Toaster position="top-right" />
//       <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex overflow-hidden">
//         <div className="w-1/3 bg-gradient-to-b from-blue-600 to-blue-700 p-6 flex flex-col items-center">
//           <div className="absolute top-4 right-4 bg-yellow-400 text-white px-3 py-1 rounded-full flex items-center">
//             <Star className="mr-1" size={16} /><span className="text-sm font-bold">5.0</span>
//           </div>
//           <img src={profileData.avatar} alt="Profile" className="w-48 h-48 rounded-full border-4 border-white/30 object-cover shadow-lg mb-6" />
//           <h1 className="text-2xl font-bold text-white">{profileData.first_name} {profileData.last_name}</h1>
//           <p className="text-sm text-white/80 mt-2">{profileData.describe}</p>
//         </div>
//         <div className="w-2/3 p-8">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">Profile Details</h2>
//             <div className="flex space-x-2">
//               <button onClick={editMode ? handleSaveProfile : () => setEditMode(true)} className={`p-2 rounded-lg transition ${editMode ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}>
//                 {editMode ? <><Check size={20} /> Save</> : <><Edit3 size={20} /> Edit</>}
//               </button>
//               {editMode && <button onClick={() => setEditMode(false)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"><X size={20} /></button>}
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-6">
//             {['first_name', 'last_name', 'email', 'contact', 'dob', 'describe'].map(key => (
//               <div key={key} className="group">
//                 <label className="block text-xs text-gray-500 mb-1">{key.replace('_', ' ').toUpperCase()}</label>
//                 {editMode ? (
//                   <input type="text" value={profileData[key] || ''} onChange={e => handleChange(key, e.target.value)} className="w-full border-b border-blue-500 focus:outline-none pb-1" />
//                 ) : (
//                   <p className="font-medium text-gray-700">{profileData[key]}</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Edit3, Check, X, Star } from 'lucide-react';
// import { toast, Toaster } from 'react-hot-toast';
// import Sidebar from '../components/SideBar';
// import TitleBar from '../components/TitleBar';

// const ProfilePage = () => {
//   const navigate = useNavigate();
//   const [editMode, setEditMode] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [profileData, setProfileData] = useState({});

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//         const user1 = localStorage.getItem('user') || sessionStorage.getItem('user');

//         let parsedUser;
//         try {
//           parsedUser = JSON.parse(user1);
//         } catch (error) {
//           console.error("Error parsing user data:", error);
//           navigate('/login');
//           return;
//         }

//         if (!token || !user1) {
//           navigate('/login');
//           return;
//         }
//         const response = await axios.get('http://localhost:4000/profile/get', {
//           headers: { Authorization: token, User_Data: JSON.stringify(parsedUser) }
//         });
//         console.log(response);
//         // setProfileData(data.bioData.reduce((acc, item) => ({ ...acc, [item.label.replace(/\s+/g, '_').toLowerCase()]: item.value }), {}));
//         console.log(profileData);
//         setIsLoading(false);
//       } catch (error) {
//         toast.error('Failed to load profile');
//         navigate('/login');
//       }
//     };
//     fetchProfileData();
//   }, [navigate]);

//   const handleSaveProfile = async () => {
//     try {
//       const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//       const user1 = localStorage.getItem('user') || sessionStorage.getItem('user');

//       let parsedUser;
//       try {
//         parsedUser = JSON.parse(user1);
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//         navigate('/login');
//         return;
//       }

//       if (!token || !user1) {
//         navigate('/login');
//         return;
//       }
//       await axios.put('http://localhost:4000/profile/update', profileData, {
//         headers: { Authorization: token,  User_Data: JSON.stringify(parsedUser) }
//       });
//       toast.success('Profile updated successfully');
//       setEditMode(false);
//     } catch (error) {
//       toast.error('Failed to update profile');
//     }
//   };

//   const handleChange = (key, value) => {
//     setProfileData(prev => ({ ...prev, [key]: value }));
//   };

//   if (isLoading) return <div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div></div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
//       <Sidebar />
//       <TitleBar />
//       <Toaster position="top-right" />
//       <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex overflow-hidden">
//         <div className="w-1/3 bg-gradient-to-b from-blue-600 to-blue-700 p-6 flex flex-col items-center">
//           <div className="absolute top-4 right-4 bg-yellow-400 text-white px-3 py-1 rounded-full flex items-center">
//             <Star className="mr-1" size={16} /><span className="text-sm font-bold">5.0</span>
//           </div>
//           <img src={profileData.avatar} alt="Profile" className="w-48 h-48 rounded-full border-4 border-white/30 object-cover shadow-lg mb-6" />
//           <h1 className="text-2xl font-bold text-white">{profileData.first_name} {profileData.last_name}</h1>
//           <p className="text-sm text-white/80 mt-2">{profileData.describe}</p>
//         </div>
//         <div className="w-2/3 p-8">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">Profile Details</h2>
//             <div className="flex space-x-2">
//               <button onClick={editMode ? handleSaveProfile : () => setEditMode(true)} className={`p-2 rounded-lg transition ${editMode ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}>
//                 {editMode ? <><Check size={20} /> Save</> : <><Edit3 size={20} /> Edit</>}
//               </button>
//               {editMode && <button onClick={() => setEditMode(false)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"><X size={20} /></button>}
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-6">
//             {Object.entries(profileData).map(([key, value]) => (
//               <div key={key} className="group">
//                 <label className="block text-xs text-gray-500 mb-1">{key.replace('_', ' ').toUpperCase()}</label>
//                 {editMode ? (
//                   <input type="text" value={value || ''} onChange={e => handleChange(key, e.target.value)} className="w-full border-b border-blue-500 focus:outline-none pb-1" />
//                 ) : (
//                   <p className="font-medium text-gray-700">{value}</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Edit3, Check, X, Star } from 'lucide-react';
// import { toast, Toaster } from 'react-hot-toast';
// import Sidebar from '../components/SideBar';
// import TitleBar from '../components/TitleBar';

// const ProfilePage = () => {
//   const navigate = useNavigate();
//   const [editMode, setEditMode] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [profileData, setProfileData] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     describe: '',
//     avatar: '/default-avatar.png'
//   });
//   const [originalProfileData, setOriginalProfileData] = useState({});

//   // Fetch authentication token and user data
//   const getAuthToken = () => {
//     const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//     const user = localStorage.getItem('user') || sessionStorage.getItem('user');
//     return { token, user };
//   };

//   // Fetch profile data
//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const { token, user } = getAuthToken();

//         // Validate token and user data
//         if (!token || !user) {
//           toast.error('Authentication required');
//           navigate('/login');
//           return;
//         }

//         let parsedUser;
//         try {
//           parsedUser = JSON.parse(user);
//         } catch (error) {
//           console.error("Error parsing user data:", error);
//           navigate('/login');
//           return;
//         }

//         // Fetch profile data
//         const response = await axios.get('http://localhost:4000/profile/get', {
//           headers: { 
//             Authorization: token, 
//             User_Data: JSON.stringify(parsedUser) 
//           }
//         });

//         // Transform received data if necessary
//         const fetchedProfileData = response.data.bioData || {};
//         setProfileData(fetchedProfileData);
//         setOriginalProfileData(fetchedProfileData);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Profile fetch error:', error);
//         toast.error('Failed to load profile');
//         navigate('/login');
//       }
//     };

//     fetchProfileData();
//   }, [navigate]);

//   // Save profile changes
//   const handleSaveProfile = async () => {
//     try {
//       const { token, user } = getAuthToken();

//       if (!token || !user) {
//         toast.error('Authentication required');
//         navigate('/login');
//         return;
//       }

//       let parsedUser = JSON.parse(user);

//       // Send updated profile data
//       await axios.put('http://localhost:4000/profile/update', profileData, {
//         headers: { 
//           Authorization: token, 
//           User_Data: JSON.stringify(parsedUser) 
//         }
//       });

//       toast.success('Profile updated successfully');
//       setOriginalProfileData(profileData);
//       setEditMode(false);
//     } catch (error) {
//       console.error('Profile update error:', error);
//       toast.error('Failed to update profile');
//     }
//   };

//   // Cancel edit mode
//   const handleCancelEdit = () => {
//     setProfileData(originalProfileData);
//     setEditMode(false);
//   };

//   // Handle input changes
//   const handleChange = (key, value) => {
//     setProfileData(prev => ({ ...prev, [key]: value }));
//   };

//   // Determine if save button should be disabled
//   const isSaveDisabled = () => {
//     return JSON.stringify(profileData) === JSON.stringify(originalProfileData);
//   };

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   // Render profile page
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
//       <Sidebar />
//       <TitleBar />
//       <Toaster position="top-right" />
      
//       <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex overflow-hidden">
//         {/* Profile Sidebar */}
//         <div className="w-1/3 bg-gradient-to-b from-blue-600 to-blue-700 p-6 flex flex-col items-center">
//           <div className="absolute top-4 right-4 bg-yellow-400 text-white px-3 py-1 rounded-full flex items-center">
//             <Star className="mr-1" size={16} />
//             <span className="text-sm font-bold">5.0</span>
//           </div>
//           <img 
//             src={profileData.avatar || '/default-avatar.png'} 
//             alt="Profile" 
//             className="w-48 h-48 rounded-full border-4 border-white/30 object-cover shadow-lg mb-6" 
//           />
//           <h1 className="text-2xl font-bold text-white">
//             {profileData.first_name} {profileData.last_name}
//           </h1>
//           <p className="text-sm text-white/80 mt-2">
//             {profileData.describe || 'No description'}
//           </p>
//         </div>

//         {/* Profile Details */}
//         <div className="w-2/3 p-8">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">Profile Details</h2>
//             <div className="flex space-x-2">
//               <button 
//                 onClick={editMode ? handleSaveProfile : () => setEditMode(true)} 
//                 disabled={editMode && isSaveDisabled()}
//                 className={`p-2 rounded-lg transition ${
//                   editMode 
//                     ? (isSaveDisabled() 
//                       ? 'bg-gray-300 cursor-not-allowed' 
//                       : 'bg-green-500 hover:bg-green-600') 
//                     : 'bg-blue-500 hover:bg-blue-600'
//                 } text-white`}
//               >
//                 {editMode ? <><Check size={20} /> Save</> : <><Edit3 size={20} /> Edit</>}
//               </button>
//               {editMode && (
//                 <button 
//                   onClick={handleCancelEdit} 
//                   className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
//                 >
//                   <X size={20} />
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Profile Fields */}
//           <div className="grid grid-cols-2 gap-6">
//             {Object.entries(profileData)
//               .filter(([key]) => !['avatar'].includes(key))
//               .map(([key, value]) => (
//                 <div key={key} className="group">
//                   <label className="block text-xs text-gray-500 mb-1">
//                     {key.replace('_', ' ').toUpperCase()}
//                   </label>
//                   {editMode ? (
//                     <input 
//                       type="text" 
//                       value={value || ''} 
//                       onChange={e => handleChange(key, e.target.value)} 
//                       className="w-full border-b border-blue-500 focus:outline-none pb-1" 
//                     />
//                   ) : (
//                     <p className="font-medium text-gray-700">
//                       {value || 'Not specified'}
//                     </p>
//                   )}
//                 </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Edit3, Check, X, Star, Calendar, Phone, Mail } from 'lucide-react';
// import { toast, Toaster } from 'react-hot-toast';
// import Sidebar from '../components/SideBar';
// import TitleBar from '../components/TitleBar';

// const ProfilePage = () => {
//   const navigate = useNavigate();
//   const [editMode, setEditMode] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [profileData, setProfileData] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     describe: '',
//     avatar: '/default-avatar.png',
//     dob: '',
//     contact: '',
//     reviews: []
//   });
//   const [originalProfileData, setOriginalProfileData] = useState({});

//   // Fetch authentication token and user data
//   const getAuthToken = () => {
//     const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//     const user = localStorage.getItem('user') || sessionStorage.getItem('user');
//     return { token, user };
//   };

//   // Fetch profile data
//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const { token, user } = getAuthToken();

//         if (!token || !user) {
//           toast.error('Authentication required');
//           navigate('/login');
//           return;
//         }

//         let parsedUser;
//         try {
//           parsedUser = JSON.parse(user);
//         } catch (error) {
//           console.error("Error parsing user data:", error);
//           navigate('/login');
//           return;
//         }

//         const response = await axios.get('http://localhost:4000/profile/get', {
//           headers: { 
//             Authorization: token, 
//             User_Data: JSON.stringify(parsedUser) 
//           }
//         });

//         const fetchedProfileData = response.data.bioData || {};
//         setProfileData(fetchedProfileData);
//         setOriginalProfileData(fetchedProfileData);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Profile fetch error:', error);
//         toast.error('Failed to load profile');
//         navigate('/login');
//       }
//     };

//     fetchProfileData();
//   }, [navigate]);

//   // Save profile changes
//   const handleSaveProfile = async () => {
//     try {
//       const { token, user } = getAuthToken();

//       if (!token || !user) {
//         toast.error('Authentication required');
//         navigate('/login');
//         return;
//       }

//       let parsedUser = JSON.parse(user);

//       await axios.put('http://localhost:4000/profile/update', profileData, {
//         headers: { 
//           Authorization: token, 
//           User_Data: JSON.stringify(parsedUser) 
//         }
//       });

//       toast.success('Profile updated successfully');
//       setOriginalProfileData(profileData);
//       setEditMode(false);
//     } catch (error) {
//       console.error('Profile update error:', error);
//       toast.error('Failed to update profile');
//     }
//   };

//   // Cancel edit mode
//   const handleCancelEdit = () => {
//     setProfileData(originalProfileData);
//     setEditMode(false);
//   };

//   // Handle input changes
//   const handleChange = (key, value) => {
//     setProfileData(prev => ({ ...prev, [key]: value }));
//   };

//   // Calculate average review rating
//   const calculateAverageRating = () => {
//     if (!profileData.reviews || profileData.reviews.length === 0) return 0;
//     const totalRating = profileData.reviews.reduce((sum, review) => sum + review.rating, 0);
//     return (totalRating / profileData.reviews.length).toFixed(1);
//   };

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
//       <Sidebar />
//       <TitleBar />
//       <Toaster position="top-right" />
      
//       <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl flex overflow-hidden">
//         {/* Profile Sidebar */}
//         <div className="w-1/3 bg-gradient-to-b from-blue-600 to-blue-700 p-6 flex flex-col items-center">
//           <div className="absolute top-4 right-4 bg-yellow-400 text-white px-3 py-1 rounded-full flex items-center">
//             <Star className="mr-1" size={16} />
//             <span className="text-sm font-bold">{calculateAverageRating()}</span>
//           </div>
//           <img 
//             src={profileData.avatar || '/default-avatar.png'} 
//             alt="Profile" 
//             className="w-48 h-48 rounded-full border-4 border-white/30 object-cover shadow-lg mb-6" 
//           />
//           <h1 className="text-2xl font-bold text-white">
//             {profileData.first_name} {profileData.last_name}
//           </h1>
//           <p className="text-sm text-white/80 mt-2 text-center">
//             {profileData.describe || 'No description'}
//           </p>
          
//           {/* Additional Contact Info */}
//           <div className="mt-6 w-full space-y-3">
//             {profileData.email && (
//               <div className="flex items-center text-white/80">
//                 <Mail className="mr-2" size={16} />
//                 <span className="text-sm truncate">{profileData.email}</span>
//               </div>
//             )}
//             {profileData.contact && (
//               <div className="flex items-center text-white/80">
//                 <Phone className="mr-2" size={16} />
//                 <span className="text-sm">{profileData.contact}</span>
//               </div>
//             )}
//             {profileData.dob && (
//               <div className="flex items-center text-white/80">
//                 <Calendar className="mr-2" size={16} />
//                 <span className="text-sm">{new Date(profileData.dob).toLocaleDateString()}</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Profile Details */}
//         <div className="w-2/3 p-8">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">Profile Details</h2>
//             <div className="flex space-x-2">
//               <button 
//                 onClick={editMode ? handleSaveProfile : () => setEditMode(true)} 
//                 className={`p-2 rounded-lg transition ${
//                   editMode ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
//                 } text-white`}
//               >
//                 {editMode ? <><Check size={20} /> Save</> : <><Edit3 size={20} /> Edit</>}
//               </button>
//               {editMode && (
//                 <button 
//                   onClick={handleCancelEdit} 
//                   className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
//                 >
//                   <X size={20} />
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Reviews Section */}
//           <div className="mb-6">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Reviews</h3>
//             {profileData.reviews && profileData.reviews.length > 0 ? (
//               <div className="space-y-3">
//                 {profileData.reviews.slice(0, 3).map((review, index) => (
//                   <div key={index} className="bg-gray-100 p-3 rounded-lg">
//                     <div className="flex justify-between items-center mb-2">
//                       <div className="flex items-center">
//                         <Star className="text-yellow-500 mr-1" size={16} />
//                         <span className="font-medium">{review.rating}/5</span>
//                       </div>
//                       <span className="text-sm text-gray-500">
//                         {new Date(review.date).toLocaleDateString()}
//                       </span>
//                     </div>
//                     <p className="text-gray-700 text-sm">{review.comment}</p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">No reviews yet</p>
//             )}
//           </div>

//           {/* Profile Fields */}
//           <div className="grid grid-cols-2 gap-6">
//             {Object.entries(profileData)
//               .filter(([key]) => !['avatar', 'reviews'].includes(key))
//               .map(([key, value]) => (
//                 <div key={key} className="group">
//                   <label className="block text-xs text-gray-500 mb-1">
//                     {key.replace('_', ' ').toUpperCase()}
//                   </label>
//                   {editMode ? (
//                     <input 
//                       type={key === 'dob' ? 'date' : 'text'} 
//                       value={value || ''} 
//                       onChange={e => handleChange(key, e.target.value)} 
//                       className="w-full border-b border-blue-500 focus:outline-none pb-1" 
//                     />
//                   ) : (
//                     <p className="font-medium text-gray-700">
//                       {key === 'dob' && value 
//                         ? new Date(value).toLocaleDateString() 
//                         : (value || 'Not specified')}
//                     </p>
//                   )}
//                 </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Edit3, Check, X, Star, Calendar, Phone, Mail } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import Sidebar from '../components/SideBar';
import TitleBar from '../components/TitleBar';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    describe: '',
    avatar: '/default-avatar.png',
    dob: '',
    contact: '',
    average_rating: null,
    total_reviews: 0
  });
  const [originalProfileData, setOriginalProfileData] = useState({});

  // Fetch authentication token and user data
  const getAuthToken = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    return { token, user };
  };

  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { token, user } = getAuthToken();

        if (!token || !user) {
          toast.error('Authentication required');
          navigate('/login');
          return;
        }

        let parsedUser;
        try {
          parsedUser = JSON.parse(user);
        } catch (error) {
          console.error("Error parsing user data:", error);
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:4000/profile/get', {
          headers: { 
            Authorization: token, 
            User_Data: JSON.stringify(parsedUser) 
          }
        });

        const fetchedProfileData = response.data.bioData || {};
        setProfileData(fetchedProfileData);
        setOriginalProfileData(fetchedProfileData);
        setIsLoading(false);
      } catch (error) {
        console.error('Profile fetch error:', error);
        toast.error('Failed to load profile');
        navigate('/login');
      }
    };

    fetchProfileData();
  }, [navigate]);

  // Save profile changes
  const handleSaveProfile = async () => {
    try {
      const { token, user } = getAuthToken();

      if (!token || !user) {
        toast.error('Authentication required');
        navigate('/login');
        return;
      }

      let parsedUser = JSON.parse(user);

      const response = await axios.put('http://localhost:4000/profile/update', profileData, {
        headers: { 
          Authorization: token, 
          User_Data: JSON.stringify(parsedUser) 
        }
      });

      toast.success('Profile updated successfully');
      setOriginalProfileData(response.data.bioData);
      setProfileData(response.data.bioData);
      setEditMode(false);
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.response?.data?.msg || 'Failed to update profile');
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setProfileData(originalProfileData);
    setEditMode(false);
  };

  // Handle input changesStar
  const handleChange = (key, value) => {
    setProfileData(prev => ({ ...prev, [key]: value }));
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <Sidebar />
      <TitleBar title="Profile Page" />
      <Toaster position="top-right" />
      
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl flex overflow-hidden">
        {/* Profile Sidebar */}
        <div className="w-1/3 bg-gradient-to-b from-blue-600 to-blue-700 p-6 flex flex-col">
          <div className="relative top-6 left-1 w-[26%] bg-yellow-400 text-white px-3 py-1  flex">
            <Star className="mr-1" size={16} />
            <span className="text-sm font-bold">
              {console.log(profileData)}
              {profileData.average_rating || 'N/A'}
            </span>
          </div>
          <img 
            src={'https://res.cloudinary.com/dy7p8b11o/image/upload/v1738759425/banners/uahki4waolgoniib36eo.jpg'} 
            alt="Profile" 
            className="w-48 h-48 rounded-full border-4 border-white/30 object-cover shadow-lg mb-6 self-center " 
          />
          <h1 className="text-2xl font-bold text-white text-center">
            {profileData.first_name} {profileData.last_name}
          </h1>
          <p className="text-sm text-white/80 mt-2 text-center">
            {profileData.describe || 'No description'}
          </p>
          
          {/* Additional Contact Info */}
          <div className="mt-6 w-full space-y-3">
            {profileData.email && (
              <div className="flex items-center text-white/80">
                <Mail className="mr-2" size={16} />
                <span className="text-sm truncate">{profileData.email}</span>
              </div>
            )}
            {profileData.contact && (
              <div className="flex items-center text-white/80">
                <Phone className="mr-2" size={16} />
                <span className="text-sm">{profileData.contact}</span>
              </div>
            )}
            {profileData.dob && (
              <div className="flex items-center text-white/80">
                <Calendar className="mr-2" size={16} />
                <span className="text-sm">{new Date(profileData.dob).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Profile Details */}
        <div className="w-2/3 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Profile Details</h2>
            {/* <div className="flex-row space-x-2">
              <button 
                onClick={editMode ? handleSaveProfile : () => setEditMode(true)} 
                className={`px-20 rounded-lg flex-row w-[100%] transition ${
                  editMode ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                {editMode ? <><Check size={20} /> Save</> : <><Edit3 size={20} /> Edit</>}
              </button>
              {editMode && (
                <button 
                  onClick={handleCancelEdit} 
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                >
                  <X size={20} />
                </button>
              )}
            </div> */}
            <div className="flex items-center gap-3 w-[40%] mt-4">
              <button 
                onClick={editMode ? handleSaveProfile : () => setEditMode(true)}
                className={`
                  flex items-center justify-center gap-2 px-6 py-3 rounded-lg
                  font-medium text-white transition-all duration-200
                  shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                  flex-1 min-w-[120px]
                  ${editMode 
                    ? 'bg-green-500 hover:bg-green-600 active:bg-green-700' 
                    : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
                  }
                `}
              >
                {editMode ? (
                  <>
                    <Check className="w-5 h-5" strokeWidth={2.5} />
                    <span>Save</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="w-5 h-5" strokeWidth={2.5} />
                    <span>Edit</span>
                  </>
                )}
              </button>

              {editMode && (
                <button 
                  onClick={handleCancelEdit}
                  className="
                    flex items-center justify-center p-3 rounded-lg
                    bg-red-500 hover:bg-red-600 active:bg-red-700
                    text-white transition-all duration-200
                    shadow-md hover:shadow-lg
                    transform hover:-translate-y-0.5
                  "
                  title="Cancel"
                >
                  <X className="w-5 h-5" strokeWidth={2.5} />
                </button>
              )}
            </div>
          </div>

          {/* Profile Fields */}
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(profileData)
              .filter(([key]) => !['avatar', 'average_rating', 'total_reviews'].includes(key))
              .map(([key, value]) => (
                <div key={key} className="group">
                  <label className="block text-xs text-gray-500 mb-1">
                    {key.replace('_', ' ').toUpperCase()}
                  </label>
                  {editMode ? (
                    <input 
                      type={key === 'dob' ? 'date' : 'text'} 
                      value={key === 'dob' && value ? new Date(value).toISOString().split('T')[0] : (value || '')} 
                      onChange={e => handleChange(key, e.target.value)} 
                      className="w-full border-b border-blue-500 focus:outline-none pb-1" 
                    />
                  ) : (
                    <p className="font-medium text-gray-700">
                      {key === 'dob' && value 
                        ? new Date(value).toLocaleDateString() 
                        : (value || 'Not specified')}
                    </p>
                  )}
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;