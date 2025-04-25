import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { X, ChevronRight } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [learnMoreExpanded, setLearnMoreExpanded] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <Link to="/" className="flex items-center" onClick={onClose}>
          <img
            alt="RapidAPI Hub"
            width={110}
            height={30}
            src="https://rapidapi.com/hub/_next/image?url=https%3A%2F%2Frapidapi-prod-fe-static.s3.amazonaws.com%2Ftheming%2FRapid_Logo_Primary.png&w=256&q=10"
            className="pr-3.5"
          />
        </Link>
        <button onClick={onClose} className="p-2">
          <X className="h-6 w-6 text-gray-500" />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-6">
          <div 
            className="flex justify-between items-center py-3 font-medium text-lg"
            onClick={() => setLearnMoreExpanded(!learnMoreExpanded)}
          >
            <span>Learn More</span>
            <ChevronRight className={`h-5 w-5 transition-transform ${learnMoreExpanded ? 'rotate-90' : ''}`} />
          </div>
          
          {learnMoreExpanded && (
            <div className="ml-4 space-y-4 mt-2">
              <div className="flex items-center py-2">
                <Link to="/guides" className="text-gray-600" onClick={onClose}>
                  Guides
                </Link>
              </div>
              <div className="flex items-center py-2">
                <Link to="/reports" className="text-gray-600" onClick={onClose}>
                  Reports & Datasheets
                </Link>
              </div>
              <div className="flex items-center py-2">
                <Link to="/webinars" className="text-gray-600" onClick={onClose}>
                  Webinars
                </Link>
              </div>
              <div className="flex items-center py-2">
                <Link to="/blog" className="text-gray-600" onClick={onClose}>
                  Blog
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3 mt-6">
          <Link 
            to="/contact" 
            className="block w-full py-2.5 px-4 border border-gray-300 rounded text-center"
            onClick={onClose}
          >
            Contact Us
          </Link>
          <Link 
            to="/auth" 
            className="block w-full py-2.5 px-4 border border-gray-300 rounded text-center"
            onClick={onClose}
          >
            Sign In
          </Link>
          <Link 
            to="/auth/sign-up" 
            className="block w-full py-2.5 px-4 bg-blue-500 text-white rounded text-center"
            onClick={onClose}
          >
            Sign Up
          </Link>
          <Link 
            to="/add-api" 
            className="block w-full py-2.5 px-4 border border-gray-300 rounded text-center"
            onClick={onClose}
          >
            Add Your API
          </Link>
        </div>
      </div>
    </div>
  )
}