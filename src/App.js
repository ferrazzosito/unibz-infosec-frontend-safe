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
import useUser from './hooks/useUser';

function App() {

  const [user, logUser, registerUser] = useUser();

  return (
    <div className="App">
      <Routes> 
        <Route path="/login" element={<LoginPage user={user} logUser={logUser}/>}/>
        <Route path="/sign-up" element={<RegistrationPage user={user} registerUser={registerUser}/>} />
        <Route path="/" element={<BuyerHomePage user={user} />} />
        <Route path="/selling" element={<VendorHomePage user={user}/>} />
          {/* <ReviewForm /> */}
          {/* <VendorHomePage /> */}
          {/* <LoginPage /> */}
          {/* <RegistrationPage /> */}
          {/* <ProductPage />       */}

        </Routes>
    
    </div>
  );
}

export default App;
