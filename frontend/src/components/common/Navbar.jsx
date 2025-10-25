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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex justify-center">
        <div className="flex items-center justify-between whitespace-nowrap w-full max-w-[1280px] py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 text-gray-900">
            <div className="w-6 h-6 text-primary">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fillRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-tight">CulturaCart</h2>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center gap-8">
            <div className="flex items-center gap-9">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium leading-normal transition-colors ${
                    isActive(link.path)
                      ? 'text-primary'
                      : 'text-gray-800 hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-transparent text-gray-800 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-200 transition-colors">
              <span className="truncate">Sign In</span>
            </button>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
              <span className="truncate">Sign Up</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
