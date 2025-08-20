
import { BrowserRouter, Route, Routes,useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import Help from './pages/Help';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Createlisting from './pages/Createlisting';
import Mylisting from './pages/Mylisting';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import AdminPanel from './pages/AdminPanel';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import MyTours from './pages/MyTours';
import ToursDashboard from './pages/ToursDashboard';
import { useEffect } from 'react';
function ScrollToTop() {
  const {pathname} = useLocation();
  useEffect(()=>{
    window.scrollTo(
      {
        left: 0,
        top: 0,
        behavior: 'smooth'
      }
    );
  },[pathname]);
  return null;
}
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/listing/:id" element={<Listing />} />
        <Route path="/search" element={<Search/>} />
      
          <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Profile />} />
        <Route path="/my-tours" element={<MyTours />} />
        <Route path="/tours-dashboard" element={<ToursDashboard />} />
        <Route path="/create-listing" element={<Createlisting />} />
        <Route path="/createlisting" element={<Createlisting />} />
        <Route path="/mylisting" element={<Mylisting />} />
        <Route path="/updatelisting/:listingId" element={<UpdateListing/>} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
          </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
 