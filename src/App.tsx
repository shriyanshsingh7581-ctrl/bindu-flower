import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import {
  CartPage,
  CheckoutPage,
  BookingConfirmationPage,
} from './pages/CartAndCheckoutPage';
import { AuthPage, CustomerDashboardPage } from './pages/AuthAndAccountPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { InfoPage } from './pages/InfoPages';

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/collections/:category" element={<CollectionsPage />} />
            <Route path="/search" element={<CollectionsPage />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />

            {/* Cart, Checkout & Confirmation */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />

            {/* Authentication */}
            <Route path="/login" element={<AuthPage mode="login" />} />
            <Route path="/register" element={<AuthPage mode="register" />} />
            <Route path="/forgot-password" element={<AuthPage mode="forgot" />} />

            {/* Customer Dashboard */}
            <Route path="/account" element={<CustomerDashboardPage />} />
            <Route path="/account/orders" element={<CustomerDashboardPage />} />
            <Route path="/account/addresses" element={<CustomerDashboardPage />} />
            <Route path="/account/profile" element={<CustomerDashboardPage />} />
            <Route path="/account/support" element={<CustomerDashboardPage />} />

            {/* Informational & Partner Pages */}
            <Route path="/about-us" element={<InfoPage page="about" />} />
            <Route path="/contact-us" element={<InfoPage page="contact" />} />
            <Route path="/our-work" element={<InfoPage page="our-work" />} />
            <Route path="/blogs" element={<InfoPage page="blogs" />} />
            <Route path="/faq" element={<InfoPage page="faq" />} />
            <Route path="/terms-and-conditions" element={<InfoPage page="terms" />} />
            <Route path="/privacy-policy" element={<InfoPage page="privacy" />} />
            <Route path="/cancellation-policy" element={<InfoPage page="cancellation" />} />
            <Route path="/payment-info" element={<InfoPage page="payment-info" />} />
            <Route path="/franchise" element={<InfoPage page="partner" />} />
            <Route path="/partner-with-us" element={<InfoPage page="partner" />} />

            {/* Admin Portal */}
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/*" element={<AdminDashboardPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </StoreProvider>
  );
}
