import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-sand-50 to-terracotta-50 border-t border-sand-200">
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex justify-center py-10 md:py-12">
        <div className="w-full max-w-[1280px] flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 text-gray-900 group">
            <div className="w-7 h-7 text-terracotta-500 transition-transform group-hover:scale-110">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fillRule="evenodd" />
              </svg>
            </div>
            <h2 className="font-heading text-xl font-bold">SophoTravel</h2>
          </Link>

          {/* Footer Links */}
          <div className="text-center md:text-right text-sm text-gray-600">
            <p className="font-medium">&copy; {new Date().getFullYear()} SophoTravel. All Rights Reserved.</p>
            <div className="flex justify-center md:justify-end gap-6 mt-3">
              <Link to="/terms" className="hover:text-terracotta-600 transition-colors font-medium">
                Terms of Service
              </Link>
              <Link to="/privacy" className="hover:text-terracotta-600 transition-colors font-medium">
                Privacy Policy
              </Link>
              <Link to="/contact" className="hover:text-terracotta-600 transition-colors font-medium">
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
