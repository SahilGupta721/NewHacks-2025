import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function SignUpPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement sign up logic with backend
    console.log('Sign up:', formData);

    // Temporary: Mock user creation
    const user = {
      id: Date.now(),
      name: formData.fullName,
      email: formData.email,
      avatar: null,
      provider: 'email'
    };
    login(user);
    navigate('/');
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
                  className="flex w-full justify-center rounded-lg bg-terracotta-500 py-3 px-4 text-sm font-semibold text-gray-900 shadow-md hover:bg-terracotta-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-500 transition-colors cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            </form>

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
