import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ShoppingBag } from 'lucide-react';

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement sign up logic
    console.log('Sign up:', formData);
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google OAuth
    console.log('Google sign up');
  };

  const handleFacebookSignUp = () => {
    // TODO: Implement Facebook OAuth
    console.log('Facebook sign up');
  };

  return (
    <div className="relative flex min-h-screen bg-background">
      {/* Left side - Form */}
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Logo & Header */}
          <div>
            <Link to="/" className="flex items-center gap-3 text-gray-900 hover:opacity-80 transition-opacity">
              <ShoppingBag size={32} className="text-terracotta-500" />
              <h2 className="font-heading text-2xl font-bold tracking-tight">CulturaCart</h2>
            </Link>
            <div className="mt-8">
              <h1 className="font-heading text-3xl font-extrabold text-gray-900">
                Create Your CulturaCart Account
              </h1>
              <p className="mt-2 text-base text-gray-600">
                Discover authentic treasures from around the world.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="full-name" className="block text-sm font-medium text-gray-900">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="full-name"
                    name="full-name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="e.g., Maria Garcia"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="block w-full rounded-lg border-2 border-sand-200 bg-white h-12 px-4 placeholder:text-gray-400 text-gray-900 focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-100 transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="e.g., maria.garcia@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="block w-full rounded-lg border-2 border-sand-200 bg-white h-12 px-4 placeholder:text-gray-400 text-gray-900 focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-100 transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="block w-full rounded-lg border-2 border-sand-200 bg-white h-12 px-4 pr-10 placeholder:text-gray-400 text-gray-900 focus:border-terracotta-500 focus:ring-2 focus:ring-terracotta-100 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="text-xs text-gray-600">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="font-medium text-terracotta-600 hover:text-terracotta-700">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="font-medium text-terracotta-600 hover:text-terracotta-700">
                  Privacy Policy
                </Link>.
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-lg bg-terracotta-500 py-3 px-4 text-sm font-semibold text-white shadow-md hover:bg-terracotta-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-500 transition-colors"
                >
                  Create Account
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-sand-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-background px-2 text-gray-600">or sign up with</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {/* Google */}
                <button
                  onClick={handleGoogleSignUp}
                  className="inline-flex w-full justify-center items-center rounded-lg border-2 border-sand-200 bg-white py-3 px-4 text-sm font-medium text-gray-900 shadow-sm hover:bg-sand-50 hover:border-terracotta-300 transition-colors"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="ml-2">Google</span>
                </button>

                {/* Facebook */}
                <button
                  onClick={handleFacebookSignUp}
                  className="inline-flex w-full justify-center items-center rounded-lg border-2 border-sand-200 bg-white py-3 px-4 text-sm font-medium text-gray-900 shadow-sm hover:bg-sand-50 hover:border-terracotta-300 transition-colors"
                >
                  <svg className="h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-2">Facebook</span>
                </button>
              </div>

              {/* Login Link */}
              <p className="mt-8 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-terracotta-600 hover:text-terracotta-700">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80"
          alt="Vibrant, colorful spices and textiles in a bustling marketplace"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta-500/20 to-transparent"></div>
      </div>
    </div>
  );
}

export default SignUpPage;
