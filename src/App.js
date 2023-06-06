import logo from './logo.svg';
import './App.css';
import { EmailField, PasswordField, StringField } from './components/FormComponents';
import { useState } from 'react';
import { ConfirmationButton } from './components/Buttons';
import { ReviewForm, SignInForm, SignUpForm } from './fragments/Forms';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import { BasicProductCard, ReviewCard } from './fragments/ProductCards';
import BuyerHomePage from './pages/BuyerHomePage';
import ProductPage from './pages/ProductPage';
import VendorHomePage from './pages/VendorHomePage';
import { Route, Routes } from "react-router-dom";
import {useUser} from './hooks/useUser';
import RequireAuth, { RequireCustomerAuth, RequireVendorAuth } from './fragments/RequireAuth';
import { BrowserRouter } from 'react-router-dom';
import { authContext } from './hooks/useUser';
import BuyerProfilePage from './pages/BuyerProfilePage';
import VendorProfilePage from './pages/VendorProfilePage';
import VendorPage from './pages/VendorPage';


function App() {

  const auth = useUser();

  return (
    <authContext.Provider value={auth}>
      <BrowserRouter>
        <div className="App">
        

          <Routes> 
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/sign-up" element={<RegistrationPage/>} />
            <Route path="/" element={<RequireCustomerAuth> <BuyerHomePage/> </RequireCustomerAuth>} />
            <Route path="/my-profile-buyer" element={<RequireCustomerAuth> <BuyerProfilePage/> </RequireCustomerAuth>} />
            <Route path="/selling" element={<RequireVendorAuth> <VendorHomePage/> </RequireVendorAuth>} />
            <Route path="/my-profile-vendor" element={<RequireVendorAuth> <VendorProfilePage/> </RequireVendorAuth>} />
            <Route path="/product" element={<RequireAuth> <ProductPage/> </RequireAuth>} />
            <Route path="/vendor" element={<RequireCustomerAuth> <VendorPage/> </RequireCustomerAuth>} />
              {/* <ReviewForm /> */}
              {/* <VendorHomePage /> */}
              {/* <LoginPage /> */}
              {/* <RegistrationPage /> */}
              {/* <ProductPage />       */}

              {//todo: 404 goes in login
              }

            </Routes>
        
        </div>
      </BrowserRouter>
    </authContext.Provider>
  );
}

export default App;
