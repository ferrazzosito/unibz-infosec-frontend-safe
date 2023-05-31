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
import RequireAuth from './fragments/RequireAuth';
import { BrowserRouter } from 'react-router-dom';
import { authContext } from './hooks/useUser';

function App() {

  const auth = useUser();

  // console.log(JSON.stringify(auth.user));

  return (
    <authContext.Provider value={auth}>
      <BrowserRouter>
        <div className="App">
          <Routes> 
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/sign-up" element={<RegistrationPage/>} />
            <Route path="/" element={<RequireAuth> <BuyerHomePage/> </RequireAuth>} />
            <Route path="/selling" element={<RequireAuth> <VendorHomePage/> </RequireAuth>} />
              {/* <ReviewForm /> */}
              {/* <VendorHomePage /> */}
              {/* <LoginPage /> */}
              {/* <RegistrationPage /> */}
              {/* <ProductPage />       */}

            </Routes>
        
        </div>
      </BrowserRouter>
    </authContext.Provider>
  );
}

export default App;
