import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import HomePage from './pages/Home/homePage';
import AboutusPage from './pages/AboutUs/Aboutus';
import ProductsPage from './pages/Prouducts/ProductsPage';
import NotFound from './pages/NotFound';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/profile/ProfilePage';
import CartPage from './pages/cart/CartPage';
import IsLoggedin from './components/protectedRoutes/IsLoggedin';
import ToggleProvider from './components/hooks-form/ToggleProvider';
import { RecoilRoot } from 'recoil';
import SingleProduct from './pages/singlePages/SingleProduct';
import WishListPage from './pages/WishListPage/WishListPage';
import WelcomePage from './pages/Welcome/WelcomePage';
import CoreLayout from './Layout/CoreLayout/CoreLayout';
import CheckoutPage from './pages/Checkout/CheckoutPage';



function App() {
  return (
    <ToggleProvider>
      <RecoilRoot>
        <div className="App">
          <BrowserRouter>
            <Routes>
            <Route path="/" element={<CoreLayout />}>
              <Route path="welcome" element={<WelcomePage />} />
              <Route index element={<AboutusPage />} />
              
              <Route path="main" element={<MainLayout />}>
                {/* Define public routes */}
                <Route path="/main/" element={<HomePage />} />
                <Route path="/main/home" element={<MainPage />} />
                
                <Route path="/main/product/:id" element={<SingleProduct />} />
                <Route path="/main/products" element={<ProductsPage />} /> 
                {/* Define protected routes */}
                <Route element={<IsLoggedin><Outlet /></IsLoggedin>}>
                  
                  <Route path="/main/profile" element={<ProfilePage />} />
                  <Route path="/main/cart" element={<CartPage />} />
                  <Route path="/main/checkout" element={<CheckoutPage />} />
                  <Route path="/main/wish" element={<WishListPage />} />
                </Route>

                {/* Catch-all route for 404 */}
                <Route path="*" element={<NotFound />} />
              </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </RecoilRoot>
    </ToggleProvider>
  );
}

export default App;
