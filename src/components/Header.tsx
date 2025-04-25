import React from 'react'
import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, Menu, X } from 'lucide-react'
import MobileMenu from "./MobileMenu"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <>
      <header className="border-b border-gray-200 py-3 px-4 sticky top-0 bg-white z-30">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                alt="RapidAPI Hub"
                width={110}
                height={30}
                src="https://rapidapi.com/hub/_next/image?url=https%3A%2F%2Frapidapi-prod-fe-static.s3.amazonaws.com%2Ftheming%2FRapid_Logo_Primary.png&w=256&q=10"
                className="pr-3.5"
              />
              <span className="text-xs text-gray-500 ml-1 hidden sm:inline">Your API Hub</span>
            </Link>
          </div>

          {/* Search Bar Section - Hidden on mobile when not focused */}
          <div className={`${searchFocused ? 'flex' : 'hidden md:flex'} justify-center mx-4 transition-all duration-300 ease-in-out flex-1 max-w-xl`}>
            <div className="relative group w-full max-w-[300px] focus-within:max-w-[500px] transition-all duration-300">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search APIs"
                className="block w-full pl-10 pr-16 py-2 border border-gray-300 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-500 pointer-events-none border border-gray-300">
                Ctrl + K
              </div>
            </div>
          </div>

          {/* Mobile Search Icon - Only visible on mobile when search not focused */}
          {!searchFocused && (
            <button 
              className="md:hidden p-2 rounded-full text-gray-500 hover:bg-gray-100"
              onClick={() => setSearchFocused(true)}
            >
              <Search className="h-5 w-5" />
            </button>
          )}

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Mobile Menu Button - Only visible on mobile */}
            <button 
              className="md:hidden p-2 rounded-full text-gray-500 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Add Your API
              </button>
              <Link to="/auth/" className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium">
                Sign In
              </Link>
              <Link to="auth/sign-up" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
