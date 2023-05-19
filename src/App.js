import logo from './logo.svg';
import './App.css';
import { EmailField, PasswordField, StringField } from './components/FormComponents';
import { useState } from 'react';
import { ConfirmationButton } from './components/Buttons';
import { SignInForm, SignUpForm } from './fragments/Forms';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import { BasicProductCard } from './fragments/ProductCards';
import BuyerHomePage from './pages/BuyerHomePage';

function App() {

  

  return (
    <div className="App">
      {/* <RegistrationPage /> */}
      <BuyerHomePage />
    </div>
  );
}

export default App;
