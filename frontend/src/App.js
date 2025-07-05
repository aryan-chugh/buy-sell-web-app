// import {BrowserRouter, Routes, Route} from "react-router-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoutes';
import NotFoundPage from './pages/NotFound';

import Dashboard from './pages/Dashboard'
import ProfilePage from './pages/Profile'
import './index.css';
import SearchPage from "./pages/Search";
import CartPage from "./pages/MyCart";
import ProductPage from "./pages/ItemPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OrdersDashboardSeller from "./pages/OrdersSeller";
import OrdersDashboardBuyer from "./pages/OrdersBuyer";
import ItemListingForm from "./pages/SellItem";

// function App () {
//     return ( 
//       <div className="App">
//         <BrowserRouter>
//           <div className="pages">
//             <Routes>
//               <Route
//                 path="/dashboard"
//                 element={
//                   <Dashboard />
//                 }
//               />
//               <Route 
//                 path="/orders/seller"
//                 element= {
//                   <OrdersDashboardSeller />
//                 }
//               />
              
//               <Route 
//                 path="/orders/buyer"
//                 element= {
//                   <OrdersDashboardBuyer />
//                 }
//               />

//               <Route
//                 path="/search"
//                 element={
//                   <SearchPage />
//                 }
//               />
//               <Route
//                 path="/item/:item_id"
//                 element={
//                   <ProductPage />
//                 }
//               />

//              
//               <Route
//                 path="/profile-page"
//                 element={
//                   // <PrivateRoute>
//                     <ProfilePage />
//                   // </PrivateRoute>
//                 }
//               />

//               <Route
//                 path="/sell"
//                 element={
//                   <ItemListingForm />
//                 }
//                 />
              
//               <Route
//                 path="/login"
//                 element={
//                   <LoginPage />
//                 }
//               />

//               <Route
//                 path="/register"
//                 element={
//                   <RegisterPage />
//                 }
//               />

              
//             </Routes>
//           </div>
//         </BrowserRouter>
//       </div>
//     );
// }

// export default App;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              // <PrivateRoute>
                <Dashboard />
              // </PrivateRoute>
            } 
          />
          <Route 
            path="/profile-page" 
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/sell" 
            element={
              <PrivateRoute>
                <ItemListingForm />
              </PrivateRoute>
            } 
          />
          
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />

          <Route 
            path="/orders/seller" 
            element={
              <PrivateRoute>
                <OrdersDashboardSeller />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/orders/buyer" 
            element={
              <PrivateRoute>
                <OrdersDashboardBuyer />
              </PrivateRoute>
            } 
          />

          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/item/:item_id" element={<ProductPage />} />
          
          {/* Add other routes... */}

          {/* Catch-all 404 Route - Must be the last route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
