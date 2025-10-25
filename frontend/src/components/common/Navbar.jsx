import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/discover', label: 'Destinations' },
    { path: '/map', label: 'Artisans' },
    { path: '/stories', label: 'About' },
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
            <button className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-transparent text-gray-700 text-sm font-semibold leading-normal hover:bg-sand-100 transition-colors">
              <span className="truncate">Sign In</span>
            </button>
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-terracotta-500 text-gray-700 text-sm font-semibold leading-normal hover:bg-terracotta-600 transition-all shadow-sm hover:shadow-md">
              <span className="truncate">Sign Up</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
