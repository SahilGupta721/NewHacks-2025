import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import DiscoverPage from './pages/DiscoverPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ArtisanProfilePage from './pages/ArtisanProfilePage';
import CartPage from './pages/CartPage';
import MapPage from './pages/MapPage';
import StoriesPage from './pages/StoriesPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Auth routes - without MainLayout */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* Main app routes - with MainLayout */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/artisan/:id" element={<ArtisanProfilePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/stories" element={<StoriesPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
