import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation,Link } from 'react-router-dom';

import { FaSearch } from "react-icons/fa";
function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl); // Fixed: was using searchTerm instead of searchTermFromUrl
    }
  }, [location.search]);

  return (
    <header className="bg-white shadow-lg">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        {/* Logo */}
        <h1 className="font-bold text-lg sm:text-2xl">
          <Link to="/" className="flex items-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900">
              Mayank
            </span>
            <span className="text-red-700">Estate</span>
          </Link>
        </h1>
        {/* Search Bar */}
        <form
        onSubmit={handleSubmit}
          action=""
          className="flex items-center bg-gray-100 rounded-full shadow-sm px-4 py-2"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            className="bg-transparent focus:outline-none w-32 sm:w-64 text-sm text-gray-700"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="text-gray-500 ml-2" />
        </form>

        {/* Navigation */}
        <ul className="flex items-center gap-6">
          <Link to="/">
            <li className="hidden sm:block text-gray-700 font-medium hover:text-blue-500 transition duration-200">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:block text-gray-700 font-medium hover:text-blue-500 transition duration-200">
              About
            </li>
          </Link>
          
          {/* Show "My Listing" only for owners and admins */}
          {currentUser && (currentUser.role === 'owner' || currentUser.role === 'admin') && (
            <Link to="/mylisting">
              <li className="hidden sm:block text-gray-700 font-medium hover:text-blue-500 transition duration-200">
                My Listing
              </li>
            </Link>
          )}
          
          {/* Show "Create Listing" only for owners and admins */}
          {currentUser && (currentUser.role === 'owner' || currentUser.role === 'admin') && (
            <Link to="/create-listing">
              <li className="hidden sm:block text-gray-700 font-medium hover:text-blue-500 transition duration-200">
                Create Listing
              </li>
            </Link>
          )}
          
          {/* Show "Admin Panel" only for admins */}
          {currentUser && currentUser.role === 'admin' && (
            <Link to="/admin">
              <li className="hidden sm:block text-gray-700 font-medium hover:text-blue-500 transition duration-200">
                Admin Panel
              </li>
            </Link>
          )}
          
          <Link to="/profile">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:block text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded capitalize">
                  {currentUser.role}
                </span>
                <img
                  className="rounded-full h-8 w-8 object-cover border-2 border-gray-300 hover:border-blue-500 transition duration-200"
                  src={currentUser.avatar}
                  alt="Profile"
                />
              </div>
            ) : (
              <li className="text-gray-700 font-medium hover:text-blue-500 transition duration-200">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
