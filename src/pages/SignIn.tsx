import React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CheckCircle } from "lucide-react"

export default function SignIn() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const isFormValid = formData.email && formData.password;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulated Authentication
    console.log("Sign in with:", formData)
    navigate("/")
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 py-3 flex justify-center">
        <div className="container flex justify-center">
          <Link to="/" className="flex items-center">
          <img
              alt="RapidAPI Hub: public API Marketplace"
              loading="lazy"
              width={110}
              height={30}
              decoding="async"
              className="pr-3.5"
              src="https://rapidapi.com/hub/_next/image?url=https%3A%2F%2Frapidapi-prod-fe-static.s3.amazonaws.com%2Ftheming%2FRapid_Logo_Primary.png&w=256&q=10"
              style={{ color: "transparent" }}
            />
            <span className="text-white font-bold text-xl">Rapid</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Social Login Buttons */}
            <div className="space-y-4 mb-6">
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded flex items-center justify-center">
                <img
                    alt="RapidAPI Hub: public API Marketplace"
                    width={25}
                    height={25}
                    loading="lazy"
                    decoding="async"
                    className="rounded-full mr-3"
                    src="https://rapidapi.com/static-assets/default/white-google-logo.svg"
                    style={{ color: "transparent" }}
                  />
                Login with Google
              </button>
              <button className="w-full bg-black text-white py-2 px-4 rounded flex items-center justify-center">
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="white">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Login with Github
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="px-4 text-gray-500">or</div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email (required)
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password (required)
                  </label>
                  <Link to="/forgot-password" className="text-sm text-blue-500 hover:text-blue-600">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-2 px-4 rounded-md ${
                  isFormValid
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                disabled={!isFormValid}>
                Sign In
              </button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 text-center text-gray-700">
              <p className="mb-2">
                Have a Private Hub?{" "}
                <Link to="/login-hub" className="text-blue-500 hover:text-blue-600">
                  Login here
                </Link>
              </p>
              <p>
                Not a member yet?{" "}
                <Link to="/sign-up" className="text-blue-500 hover:text-blue-600">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Blue Background with Info */}
        <div className="hidden lg:flex lg:w-1/2 bg-blue-700 text-white p-12 flex-col justify-center">
          <div className="max-w-lg mx-auto">
            <h1 className="text-4xl font-bold mb-8">Find and Connect to Thousands of APIs</h1>

            <div className="space-y-6">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0" />
                <span className="text-xl">Discover APIs</span>
              </div>

              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0" />
                <span className="text-xl">Test from your browser</span>
              </div>

              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0" />
                <span className="text-xl">Connect using code snippets</span>
              </div>

              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0" />
                <span className="text-xl">Manage APIs from one dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
