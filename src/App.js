// src/App.js
import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Header from './components/Header';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import './styles.css';

const ProductList = lazy(() => import('./components/ProductList'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const Cart = lazy(() => import('./components/Cart'));
const Checkout = lazy(() => import('./components/Checkout'));
const NotFound = lazy(() => import('./components/NotFound'));
const AuthForm = lazy(() => import('./components/AuthForm'));

const App = () => {
  const [notification, setNotification] = useState('');

  const addToCart = (product) => {
    store.dispatch({ type: 'cart/addItem', payload: product });
    setNotification('Item added to cart!');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <Provider store={store}>
      <AuthProvider> {/* Wrap with AuthProvider */}
        <Router>
          <Header />
          {notification && <div className="notification">{notification}</div>}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<ProductList addToCart={addToCart} />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/auth" element={<AuthForm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
