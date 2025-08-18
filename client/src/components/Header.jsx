import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaSearch, FaUser, FaChevronDown, FaHome, FaPlus, FaChartBar, FaCalendar, FaChartLine } from "react-icons/fa";
import { signOutUserSuccess, signOutUserstart, signOutUserFailure } from '../redux/user/useSlice';

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

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
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  // Close dropdown when route changes
  useEffect(() => {
    setIsProfileOpen(false);
  }, [location]);

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserstart());
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!res.ok) {
        dispatch(signOutUserFailure('Sign out failed'));
        return;
      }
      
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
      navigate('/');
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100/50' 
          : 'bg-white/90 backdrop-blur-lg shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110">
                  <FaHome className="text-white text-xl" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 -z-10 blur"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-3xl font-black tracking-tight">
                  <span className="text-gray-900">Elite</span>
                  <span className="text-gradient ml-1">Estates</span>
                </h1>
                <p className="text-xs text-gray-500 font-medium tracking-wider uppercase -mt-1">Premium Real Estate</p>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <form onSubmit={handleSubmit} className="w-full relative group">
                <div className="relative">
                  <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm group-focus-within:text-blue-500 transition-all duration-300" />
                  <input
                    type="text"
                    placeholder="Search luxury properties, prime locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-14 pr-16 py-4 bg-gray-50/80 border border-gray-200/60 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/90 transition-all duration-300 text-sm font-medium backdrop-blur-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <FaSearch className="text-sm" />
                  </button>
                </div>
              </form>
            </div>

            {/* Navigation & User */}
            <div className="flex items-center space-x-2">
              
              {/* Navigation Links */}
              {currentUser ? (
                <nav className="hidden lg:flex items-center space-x-1">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                  
                  {(currentUser.role === 'owner' || currentUser.role === 'admin') && (
                    <>
                      <Link to="/mylisting" className="nav-link">
                        My Properties
                      </Link>
                      <Link to="/create-listing" className="nav-link-primary">
                        <FaPlus className="mr-2 text-sm" />
                        Add Property
                      </Link>
                      <Link to="/tours-dashboard" className="nav-link">
                        <FaCalendar className="mr-2 text-sm" />
                        Tours
                      </Link>
                      <Link to="/dashboard" className="nav-link">
                        <FaChartBar className="mr-2 text-sm" />
                        Dashboard
                      </Link>
                      <Link to="/analytics" className="nav-link">
                        <FaChartLine className="mr-2 text-sm" />
                        Analytics
                      </Link>
                    </>
                  )}
                  
                  {currentUser.role === 'admin' && (
                    <Link to="/admin" className="nav-link-special">
                      Admin Panel
                    </Link>
                  )}
                  
                  {(currentUser.role === 'buyer' || currentUser.role === 'user') && (
                    <Link to="/my-tours" className="nav-link">
                      <FaCalendar className="mr-2 text-sm" />
                      My Tours
                    </Link>
                  )}
                  
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                </nav>
              ) : (
                <nav className="hidden lg:flex items-center space-x-1">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                </nav>
              )}

              {/* User Menu */}
              {currentUser ? (
                <div className="relative ml-4" ref={dropdownRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-gray-50/80 transition-all duration-300 group border border-transparent hover:border-gray-200/50"
                  >
                    <div className="relative">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg ring-2 ring-white group-hover:shadow-xl transition-all duration-300">
                        {currentUser.avatar ? (
                          <img
                            className="rounded-full w-full h-full object-cover"
                            src={currentUser.avatar}
                            alt="profile"
                          />
                        ) : (
                          <FaUser className="text-white text-sm" />
                        )}
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                        currentUser.role === 'admin' ? 'bg-yellow-500' :
                        currentUser.role === 'owner' ? 'bg-blue-500' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-semibold text-gray-900 leading-none">{currentUser.username}</p>
                      <p className="text-xs text-gray-500 capitalize leading-none mt-1">{currentUser.role}</p>
                    </div>
                    <FaChevronDown className={`text-gray-400 text-xs transition-all duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100/50 py-3 z-50 transform transition-all duration-300">
                      <div className="px-6 py-4 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                            {currentUser.avatar ? (
                              <img
                                className="rounded-full w-full h-full object-cover"
                                src={currentUser.avatar}
                                alt="profile"
                              />
                            ) : (
                              <FaUser className="text-white text-sm" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{currentUser.username}</p>
                            <p className="text-xs text-gray-500">{currentUser.email}</p>
                            <span className={`inline-block mt-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${
                              currentUser.role === 'admin' ? 'bg-yellow-100 text-yellow-800' :
                              currentUser.role === 'owner' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {currentUser.role === 'admin' ? '👑 Administrator' :
                               currentUser.role === 'owner' ? '🏠 Property Owner' : '👤 Member'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-blue-50/80 transition-colors group"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FaUser className="mr-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                          Profile Settings
                        </Link>
                        
                        {(currentUser.role === 'owner' || currentUser.role === 'admin') && (
                          <>
                            <Link
                              to="/tours-dashboard"
                              className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-blue-50/80 transition-colors group"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <FaCalendar className="mr-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                              Tours Dashboard
                            </Link>
                            <Link
                              to="/dashboard"
                              className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-blue-50/80 transition-colors group"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <FaChartBar className="mr-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                              Dashboard
                            </Link>
                            <Link
                              to="/analytics"
                              className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-blue-50/80 transition-colors group"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <FaChartLine className="mr-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                              Analytics
                            </Link>
                            <Link
                              to="/mylisting"
                              className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-blue-50/80 transition-colors group"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <FaHome className="mr-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                              My Properties
                            </Link>
                          </>
                        )}
                        
                        {(currentUser.role === 'buyer' || currentUser.role === 'user') && (
                          <Link
                            to="/my-tours"
                            className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-blue-50/80 transition-colors group"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <FaCalendar className="mr-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                            My Tours
                          </Link>
                        )}
                      </div>
                      
                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={() => {
                            handleSignOut();
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center px-6 py-3 text-sm text-red-600 hover:bg-red-50/80 transition-colors group"
                        >
                          <svg className="mr-3 w-4 h-4 text-red-400 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3 ml-4">
                  <Link
                    to="/signin"
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-primary-nav"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Search Toggle */}
              <button className="md:hidden p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all duration-200">
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSubmit} className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </form>
          </div>
        </div>
      </header>
      
      {/* Spacer to prevent content overlap */}
      <div className="h-20"></div>
    </>
  );
}

export default Header;
