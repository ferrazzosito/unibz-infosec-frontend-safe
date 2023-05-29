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

function App() {

  return (
    <div className="App">
      <RegistrationPage />
      {/* <BuyerHomePage /> */}
        {/* <ReviewForm /> */}
        {/* <VendorHomePage /> */}
        {/* <LoginPage /> */}
        {/* <RegistrationPage /> */}
        {/* <ProductPage />       */}
    
    </div>
  );
}

export default App;
