
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Createlisting from './pages/Createlisting';
import Mylisting from './pages/Mylisting';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:id" element={<Listing />} />

          <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/createlisting" element={<Createlisting />} />
        <Route path="/mylisting" element={<Mylisting />} />
        <Route path="/updatelisting/:listingId" element={<UpdateListing/>} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
 