import { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null); // Ref for the mobile menu
  const menuButtonRef = useRef(null); // Ref for the menu button to check click outside

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target) && !menuButtonRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for detecting clicks outside of the menu
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-green-400 to-blue-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-extrabold text-white">
                Real Estate
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="text-white hover:text-gray-200 inline-flex items-center px-1 pt-1 text-lg font-medium"
              >
                Home
              </Link>
              <Link
                to="/properties"
                className="text-white hover:text-gray-200 inline-flex items-center px-1 pt-1 text-lg font-medium"
              >
                Properties
              </Link>
              {isAuthenticated && (
                <Link
                  to="/recommendations"
                  className="text-white hover:text-gray-200 inline-flex items-center px-1 pt-1 text-lg font-medium"
                >
                  Recommendations
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-200 inline-flex items-center px-4 py-2 text-lg font-medium rounded-md"
              >
                Logout
              </button>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-gray-200 inline-flex items-center px-4 py-2 text-lg font-medium rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-yellow-500 text-white hover:bg-yellow-600 inline-flex items-center px-4 py-2 text-lg font-medium rounded-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              ref={menuButtonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden fixed inset-0 bg-white bg-opacity-75 z-10`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <Link
            to="/"
            className="text-gray-500 hover:text-gray-700 text-xl"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/properties"
            className="text-gray-500 hover:text-gray-700 text-xl"
            onClick={() => setIsMenuOpen(false)}
          >
            Properties
          </Link>
          {isAuthenticated && (
            <Link
              to="/recommendations"
              className="text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setIsMenuOpen(false)}
            >
              Recommendations
            </Link>
          )}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              Logout
            </button>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="text-gray-500 hover:text-gray-700 text-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 text-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;