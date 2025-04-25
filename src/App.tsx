import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ApiDocumentation from "./pages/LandingPage"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import UserProfile from "./pages/UserProfile"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ApiDocumentation />} />
        <Route path="/auth" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/user/:username" element={<UserProfile />} />
      </Routes>
    </Router>
  )
}

export default App
