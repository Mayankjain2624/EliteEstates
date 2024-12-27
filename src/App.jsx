import React from 'react'
import { BroweserRoutrer,Route,Routes,route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import About from './pages/About'
import Profie from './pages/Profie'
function App() {
  return (
    <BroweserRoutrer>
    <Routes>
      <Route path="/" element={Home}/>
      <Route path="/signin" element={Signin}/>
      <Route path="/signup" element={Signup}/>
      <Route path="/about" element={About}/>
      <Route path="/profile" element={Profie}/>
      </Routes>
    </BroweserRoutrer>
  )
}

export default App
