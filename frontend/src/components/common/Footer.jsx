import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex justify-center py-8">
        <div className="w-full max-w-[1280px] flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 text-gray-900">
            <div className="w-6 h-6 text-primary">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fillRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-lg font-bold">CulturaCart</h2>
          </Link>

          {/* Footer Links */}
          <div className="text-center md:text-right text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} CulturaCart. All Rights Reserved.</p>
            <div className="flex justify-center md:justify-end gap-4 mt-2">
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/contact" className="hover:text-primary transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
