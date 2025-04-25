import React from 'react'
import { Link } from "react-router-dom"
import { Heart } from "lucide-react"

interface ApiCardProps {
  api: {
    id: number
    name: string
    category: string
    description: string
    updatedAt: string
    popularity: number
    latency: string
    uptime: string
    icon: string
    isFavorite: boolean
  }
  username: string
}

const ApiCard: React.FC<ApiCardProps> = ({ api, username }) => {
  return (
    <div
      key={api.id}
      className="border border-gray-200 rounded-md overflow-hidden hover:shadow-md hover:bg-gray-100 transition-shadow"
    >
      {/* Card Header */}
      <div className="p-2 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600 bg-red-100 rounded-md p-1">{api.category}</span>
          <button className="text-gray-400 hover:text-red-500">
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex items-start mb-3">
          {api.name === "Airbnb" ? (
            <div>
                <img
                    alt="RapidAPI Hub: public API Marketplace"
                    loading="lazy"
                    width={110}
                    height={30}
                    decoding="async"
                    className="pr-3.5"
                    src="https://rapidapi.com/hub/_next/image?url=https%3A%2F%2Frapidapi-prod-apis.s3.amazonaws.com%2Ffdacdb22-ac1d-40e0-a81d-626ba1a26377.png&w=96&q=75"
                    style={{ color: "transparent" }}
                />
            </div>
          ) : api.name === "Wall Street Journal" ? (
            <div>
                <img
                    alt="RapidAPI Hub: public API Marketplace"
                    loading="lazy"
                    width={110}
                    height={30}
                    decoding="async"
                    className="pr-3.5"
                    src="https://rapidapi.com/hub/_next/image?url=https%3A%2F%2Frapidapi-prod-apis.s3.amazonaws.com%2Fafaef735-e5dd-48e7-8187-46b71fcbdf2e.png&w=96&q=75"
                    style={{ color: "transparent" }}
                />
            </div>
            
          ) : (
            <div>
                <img
                    alt="RapidAPI Hub: public API Marketplace"
                    loading="lazy"
                    width={110}
                    height={30}
                    decoding="async"
                    className="pr-3.5"
                    src="https://rapidapi.com/hub/_next/image?url=https%3A%2F%2Frapidapi-prod-apis.s3.amazonaws.com%2F95e2bec5-a296-4c94-ac6e-e3dc14d878c2.png&w=96&q=75"
                    style={{ color: "transparent" }}
                />
            </div>
          )}
          <div>
            <h3 className="font-medium text-gray-900">{api.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{api.description}</p>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Link to={`/user/${username}`} className="hover:text-blue-600">
            By {username}
          </Link>
          <span className="mx-2">•</span>
          <span>{api.updatedAt}</span>
        </div>

        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center border rounded-sm p-1">
            <svg
              className="h-4 w-4 text-gray-500 mr-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span>{api.popularity}</span>
          </div>

          <div className="flex items-center border rounded-sm p-1">
            <svg
              className="h-4 w-4 text-gray-500 mr-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>{api.latency}</span>
          </div>

          <div className="flex items-center border rounded-sm p-1">
            <svg
              className="h-4 w-4 text-gray-500 mr-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
            <span>{api.uptime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApiCard
