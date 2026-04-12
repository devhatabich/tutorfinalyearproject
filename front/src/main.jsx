import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';

axios.interceptors.response.use(
  response => response,
  error => {
    if (error?.response?.status === 401) {
      const publicPaths = ['/', '/login', '/signUp'];
      if (!publicPaths.includes(window.location.pathname)) {
        localStorage.removeItem('isLogin');
        localStorage.removeItem('userInfo');
        sessionStorage.setItem('auth_error', '1');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_AUTH_KEY}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>


  </StrictMode>,
)
