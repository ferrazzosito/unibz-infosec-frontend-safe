import './App.css';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
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
