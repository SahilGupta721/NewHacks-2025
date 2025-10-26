import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const navLinks = [
    { path: '/discover', label: 'Destinations' },
    { path: '/map', label: 'Artisans' },
    { path: '/stories', label: 'About' },
    { path: '/support', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-sand-200 shadow-sm">
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex justify-center">
        <div className="flex items-center justify-between whitespace-nowrap w-full max-w-[1280px] py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 text-gray-900 group">
            <div className="w-7 h-7 text-terracotta-500 transition-transform group-hover:scale-110">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fillRule="evenodd" />
              </svg>
            </div>
            <h2 className="font-heading text-xl font-bold leading-tight tracking-tight">CulturaCart</h2>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center gap-8">
            <div className="flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-semibold leading-normal transition-all ${
                    isActive(link.path)
                      ? 'text-terracotta-600 border-b-2 border-terracotta-500'
                      : 'text-gray-700 hover:text-terracotta-500'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* User Avatar & Name */}
                <div className="flex items-center gap-3">
                  <Link to="/cart" className="relative">
                    <svg className="w-6 h-6 text-gray-700 hover:text-terracotta-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </Link>
                  <div className="flex items-center gap-2">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-terracotta-500 flex items-center justify-center text-white font-semibold text-sm">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="hidden md:block text-sm font-medium text-gray-900">{user?.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-transparent text-gray-700 text-sm font-semibold leading-normal hover:bg-sand-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Sign In / Sign Up Buttons */}
                <Link
                  to="/login"
                  className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-transparent text-gray-700 text-sm font-semibold leading-normal hover:bg-sand-100 transition-colors"
                >
                  <span className="truncate">Sign In</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-terracotta-500 text-white text-sm font-semibold leading-normal hover:bg-terracotta-600 transition-all shadow-sm hover:shadow-md"
                >
                  <span className="truncate">Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
