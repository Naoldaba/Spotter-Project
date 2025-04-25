import React from 'react'
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Search, Heart, HelpCircle } from "lucide-react"
import Header from '../components/header'
import ApiCard from '../components/ApiCard'

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("published")
  const { username } = useParams<{ username: string }>()

  // Mock data 
  const publishedApis = [
    {
      id: 1,
      name: "Air Scraper",
      category: "Travel",
      description:
        "This API helps to query prices for real-time flights, hotels, rental cars, etc... to create a travel website like the skyscanner.com or booking.com, flight search, cheap flights.",
      updatedAt: "Updated 3 weeks ago",
      popularity: 9.9,
      latency: "7500ms",
      uptime: "100%",
      icon: "🌐",
      isFavorite: false,
    },
    {
      id: 2,
      name: "Airbnb",
      category: "Travel",
      description:
        "Access information on Airbnb listings, locate rooms, examine availability, and pricing in a specific location.",
      updatedAt: "Updated 3 weeks ago",
      popularity: 9.8,
      latency: "857ms",
      uptime: "100%",
      icon: "/airbnb-logo.png",
      isFavorite: false,
    },
    {
      id: 3,
      name: "Wall Street Journal",
      category: "Finance",
      description:
        "The world's most popular API for getting coverage of stock data, breaking news and market information.",
      updatedAt: "Updated 10 months ago",
      popularity: 9.8,
      latency: "569ms",
      uptime: "100%",
      icon: "WSJ",
      isFavorite: false,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header/>

      {/* Profile Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col items-center">
            <div className='flex items-center justify-between w-[70%]'>
              <div>
                 {/* Avatar */}
                <div className="w-32 h-32 bg-white rounded-full border border-gray-200 flex items-center justify-center mb-4">
                  <span className="text-xl font-medium text-gray-800">A</span>
                </div>

                <h1 className="text-lg font-bold text-gray-900 mb-8">{username}</h1>
              </div>

              <img
                alt="RapidAPI Hub: public API Marketplace"
                loading="lazy"
                width={110}
                height={30}
                decoding="async"
                className="pr-3.5"
                src="https://rapidapi.com/hub/_next/image?url=https%3A%2F%2Frapidapi-prod-fe-static.s3.amazonaws.com%2Ftheming%2FRapid_Logo_Primary.png&w=256&q=10"
                style={{ color: "transparent" }}/>
            </div>

            {/* Tabs */}
            <div className="w-full border-b border-gray-200">
              <div className="max-w-2xl mx-auto flex">
                <button
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === "published"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("published")}
                >
                  Published APIs
                </button>
                <button
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === "following"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("following")}
                >
                  APIs Following
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API List Section */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search for an API"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* API Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedApis.map((api) => (
            <ApiCard key={api.id} api={api} username={username!} />
          ))}
        </div>
      </div>
    </div>
  )
}
