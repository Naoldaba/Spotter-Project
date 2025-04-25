import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, Home, Heart, Star, Info, Bell, ChevronRight, ChevronDown } from "lucide-react"
import Header from "../components/Header"
import MobileSidebar from "../components/MobileSidebar"

interface Endpoint {
  method: string
  path: string
  section: "general" | "flights" | "hotels" | "carHire"
}

export default function LandingPage() {
  const [expandedSections, setExpandedSections] = useState({
    flights: false,
    hotels: false,
    carHire: false,
  })

  // Mobile states
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [providerInfoExpanded, setProviderInfoExpanded] = useState(false)

  // State for endpoint search
  const [endpointSearch, setEndpointSearch] = useState("")
  const [filteredEndpoints, setFilteredEndpoints] = useState<Endpoint[]>([])

  // Mock data
  const allEndpoints: Endpoint[] = [
    // General endpoints
    { method: "GET", path: "api/v1/getLocale", section: "general" },
    { method: "GET", path: "api/v1/checkServer", section: "general" },
    { method: "GET", path: "api/v1/getConfig", section: "general" },

    // Flights endpoints
    { method: "GET", path: "getNearByAirports", section: "flights" },
    { method: "GET", path: "searchAirport", section: "flights" },
    { method: "GET", path: "searchFlights (Version 2)", section: "flights" },
    { method: "GET", path: "searchFlights (Version 1)", section: "flights" },
    { method: "GET", path: "searchFlightsComplete", section: "flights" },
    { method: "GET", path: "searchIncomplete", section: "flights" },
    { method: "GET", path: "getFlightDetails", section: "flights" },
    { method: "GET", path: "getPriceCalendar", section: "flights" },
    { method: "GET", path: "searchFlightsMultiStops", section: "flights" },
    { method: "GET", path: "searchFlightEverywhere", section: "flights" },
    { method: "GET", path: "searchFlightEverywhere (Departure)", section: "flights" },
    { method: "GET", path: "searchFlightEverywhereDetails", section: "flights" },
    { method: "GET", path: "searchFlightsWebComplete", section: "flights" },

    // Hotels endpoints
    { method: "GET", path: "api/v1/hotels/searchDestination", section: "hotels" },
    { method: "GET", path: "api/v1/hotels/searchHotels", section: "hotels" },
    { method: "GET", path: "api/v1/hotels/getHotelDetails", section: "hotels" },
    { method: "GET", path: "api/v1/hotels/getHotelPrices", section: "hotels" },
    { method: "GET", path: "api/v1/hotels/getHotelReviews", section: "hotels" },
    { method: "GET", path: "api/v1/hotels/similarHotels", section: "hotels" },
    { method: "GET", path: "api/v1/hotels/nearbyMap", section: "hotels" },

    // Car Hire endpoints
    { method: "GET", path: "api/v1/cars/searchLocation", section: "carHire" },
    { method: "GET", path: "api/v1/cars/searchCars", section: "carHire" },
    { method: "GET", path: "api/v1/cars/getCarDetails", section: "carHire" },
    { method: "GET", path: "api/v1/cars/getCarPrices", section: "carHire" },
  ]

  // Filter endpoints based on search term
  useEffect(() => {
    if (endpointSearch.trim() === "") {
      setFilteredEndpoints(allEndpoints)
    } else {
      const filtered = allEndpoints.filter((endpoint) =>
        endpoint.path.toLowerCase().includes(endpointSearch.toLowerCase()),
      )
      setFilteredEndpoints(filtered)

      // Auto-expand sections that have matching endpoints
      const sections = {
        flights: filtered.some((e) => e.section === "flights"),
        hotels: filtered.some((e) => e.section === "hotels"),
        carHire: filtered.some((e) => e.section === "carHire"),
      }

      if (endpointSearch.trim() !== "") {
        setExpandedSections((prev) => ({
          ...prev,
          ...sections,
        }))
      }
    }
  }, [endpointSearch])

  // Initialize filtered endpoints
  useEffect(() => {
    setFilteredEndpoints(allEndpoints)
  }, [])

  // Toggle function for expanding/collapsing sections
  const toggleSection = (section: "flights" | "hotels" | "carHire") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Get endpoints for a specific section
  const getSectionEndpoints = (section: "general" | "flights" | "hotels" | "carHire") => {
    return filteredEndpoints.filter((endpoint) => endpoint.section === section)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* Mobile Breadcrumb */}
      <div className="md:hidden flex items-center p-3 border-b border-gray-200 overflow-x-auto whitespace-nowrap">
        <Link to="/" className="text-gray-500 hover:text-gray-700 flex-shrink-0">
          <Home className="h-4 w-4" />
        </Link>
        <span className="text-gray-400 mx-1">›</span>
        <span className="text-gray-700 flex-shrink-0">Air Scraper</span>
      </div>

      <div className="flex flex-1">
        {/* Left Sidebar - Hidden on mobile */}
        <aside className="w-64 border-r border-gray-200 flex-shrink-0 hidden md:block">
          <nav className="p-4 space-y-6">
            <div>
              <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                <div className="p-1 rounded-md bg-gray-100">
                  <Search className="h-4 w-4 text-gray-600" />
                </div>
                <span className="font-medium text-gray-700">Discovery</span>
              </div>

              <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 mt-2">
                <div className="p-1 rounded-md">
                  <Star className="h-4 w-4 text-gray-400" />
                </div>
                <span className="text-gray-500">Workspace</span>
                <div className="ml-auto">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs font-medium">Sign Up</button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                <span className="text-gray-500 text-sm">API Overview</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-700">Version</h3>
                <button className="text-blue-600 text-xs flex items-center">
                  Open playground <Info className="h-3 w-3 ml-1" />
                </button>
              </div>
              <div className="relative">
                <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                  <option>v1 (current)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-medium text-gray-700 mb-2">Endpoints</h3>
              <div className="relative mb-3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search Endpoints"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={endpointSearch}
                  onChange={(e) => setEndpointSearch(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                {/* General Endpoints */}
                {getSectionEndpoints("general").map((endpoint, index) => (
                  <div
                    key={`general-${index}`}
                    className="flex items-center text-xs text-gray-600 hover:bg-gray-100 rounded p-1"
                  >
                    <span className="text-xs text-blue-500 font-mono mr-2">{endpoint.method}</span>
                    <span className="text-gray-700">{endpoint.path}</span>
                    <Info className="h-4 w-4 ml-auto text-gray-400" />
                  </div>
                ))}

                {/* Flights Dropdown */}
                {getSectionEndpoints("flights").length > 0 && (
                  <div className="border-t border-gray-100 pt-1">
                    <div
                      className="flex items-center text-xs font-medium text-gray-600 hover:bg-gray-100 rounded p-1 cursor-pointer"
                      onClick={() => toggleSection("flights")}
                    >
                      <span className="text-gray-700 flex items-center">
                        <ChevronRight
                          className={`h-4 w-4 mr-1 transition-transform ${expandedSections.flights ? "rotate-90" : ""}`}
                        />
                        Flights
                        {endpointSearch && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                            {getSectionEndpoints("flights").length}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className={`ml-4 space-y-1 mt-1 ${expandedSections.flights ? "block" : "hidden"}`}>
                      {getSectionEndpoints("flights").map((endpoint, index) => (
                        <div
                          key={`flight-${index}`}
                          className="flex items-center text-sm text-gray-600 hover:bg-gray-100 rounded p-1"
                        >
                          <span className="text-xs text-blue-500 font-mono mr-2">{endpoint.method}</span>
                          <span className="text-xs text-gray-700">{endpoint.path}</span>
                          <Info className="h-4 w-4 ml-auto text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hotels Dropdown */}
                {getSectionEndpoints("hotels").length > 0 && (
                  <div className="border-t border-gray-100 pt-1">
                    <div
                      className="flex items-center text-xs font-medium text-gray-600 hover:bg-gray-100 rounded p-1 cursor-pointer"
                      onClick={() => toggleSection("hotels")}
                    >
                      <span className="text-gray-700 flex items-center">
                        <ChevronRight
                          className={`h-4 w-4 mr-1 transition-transform ${expandedSections.hotels ? "rotate-90" : ""}`}
                        />
                        Hotels
                        {endpointSearch && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                            {getSectionEndpoints("hotels").length}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className={`ml-4 space-y-1 mt-1 ${expandedSections.hotels ? "block" : "hidden"}`}>
                      {getSectionEndpoints("hotels").map((endpoint, index) => (
                        <div
                          key={`hotel-${index}`}
                          className="flex items-center text-sm text-gray-600 hover:bg-gray-100 rounded p-1"
                        >
                          <span className="text-xs text-blue-500 font-mono mr-2">{endpoint.method}</span>
                          <span className="text-xs text-gray-700">{endpoint.path}</span>
                          <Info className="h-4 w-4 ml-auto text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Car Hire Dropdown */}
                {getSectionEndpoints("carHire").length > 0 && (
                  <div className="border-t border-gray-100 pt-1">
                    <div
                      className="flex items-center text-xs font-medium text-gray-600 hover:bg-gray-100 rounded p-1 cursor-pointer"
                      onClick={() => toggleSection("carHire")}
                    >
                      <span className="text-gray-700 flex items-center">
                        <ChevronRight
                          className={`h-4 w-4 mr-1 transition-transform ${expandedSections.carHire ? "rotate-90" : ""}`}
                        />
                        Car Hire
                        {endpointSearch && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                            {getSectionEndpoints("carHire").length}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className={`ml-4 space-y-1 mt-1 ${expandedSections.carHire ? "block" : "hidden"}`}>
                      {getSectionEndpoints("carHire").map((endpoint, index) => (
                        <div
                          key={`car-${index}`}
                          className="flex items-center text-sm text-gray-600 hover:bg-gray-100 rounded p-1"
                        >
                          <span className="text-xs text-blue-500 font-mono mr-2">{endpoint.method}</span>
                          <span className="text-xs text-gray-700">{endpoint.path}</span>
                          <Info className="h-4 w-4 ml-auto text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No results msg */}
                {endpointSearch && filteredEndpoints.length === 0 && (
                  <div className="text-center py-4 text-gray-500">No endpoints found matching "{endpointSearch}"</div>
                )}
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="flex flex-col h-full">
            {/* Desktop Breadcrumb - Hidden on mobile */}
            <div className="hidden md:flex justify-between items-center p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2 text-sm">
                <Link to="/" className="text-gray-500 hover:text-gray-700">
                  <Home className="h-4 w-4" />
                </Link>
                <span className="text-gray-400">›</span>
                <Link to="/categories" className="text-gray-500 hover:text-gray-700">
                  Categories
                </Link>
                <span className="text-gray-400">›</span>
                <Link to="/categories/travel" className="text-gray-500 hover:text-gray-700">
                  Travel
                </Link>
                <span className="text-gray-400">›</span>
                <span className="text-gray-700">Air Scraper</span>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
                <span className="mr-2">Test Endpoint</span>
              </button>
            </div>

            {/* Mobile Test Endpoint Button */}
            <div className="md:hidden flex justify-end p-3">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium">Test Endpoint</button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button className="px-4 py-3 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
                  Overview
                </button>
                <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">Discussions</button>
              </nav>
            </div>

            {/* Mobile Endpoints Button */}
            <div className="md:hidden p-3 border-b border-gray-200">
              <button
                className="w-full flex justify-between items-center p-2 border border-gray-300 rounded-md"
                onClick={() => setMobileSidebarOpen(true)}
              >
                <span className="text-sm text-gray-700">Endpoints</span>
                <ChevronRight className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            {/* API Content */}
            <div className="flex flex-1 flex-col md:flex-row">
              <div className="flex-1 p-4 md:p-6 overflow-auto md:w-[55%]">
                {/* API Header */}
                <div className="flex items-center mb-4">
                  <div className="mr-2 text-blue-500">
                    <span className="text-xs">🌐</span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-bold mr-2">Air Scraper</h1>
                  <button className="text-gray-400 hover:text-red-500">
                    <Heart className="h-5 w-5" />
                  </button>
                  <div className="flex items-center ml-4">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <Star className="h-5 w-5 text-gray-300" />
                    <Star className="h-5 w-5 text-gray-300" />
                    <span className="text-gray-500 text-sm ml-1">(46)</span>
                  </div>
                </div>

                {/* API Metrics */}
                <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 md:gap-4 mb-6">
                  <div className="flex items-center text-sm">
                    <span className="text-gray-700 font-medium">9.9 Popularity</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-700 font-medium">100% Service Level</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-700 font-medium">7500ms Latency</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-gray-700 font-medium">100% Test</span>
                  </div>
                </div>

                {/* Pricing Tiers */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6">
                  <div className="border border-gray-200 rounded-md p-3 md:p-4">
                    <h3 className="font-medium mb-1 md:mb-2 text-sm">BASIC</h3>
                    <p className="text-gray-700 text-xs">$0.00 / mo</p>
                  </div>
                  <div className="border border-gray-200 rounded-md p-3 md:p-4">
                    <h3 className="font-medium mb-1 md:mb-2 text-sm">PRO</h3>
                    <p className="text-gray-700 text-xs">$8.99 / mo</p>
                  </div>
                  <div className="border border-gray-200 rounded-md p-3 md:p-4">
                    <h3 className="font-medium mb-1 md:mb-2 text-sm">ULTRA</h3>
                    <p className="text-gray-700 text-xs">$35.00 / mo</p>
                  </div>
                  <div className="border border-gray-200 rounded-md p-3 md:p-4">
                    <h3 className="font-medium mb-1 md:mb-2 text-sm">MEGA</h3>
                    <p className="text-gray-700 text-xs">$100.00 / mo</p>
                  </div>
                </div>

                {/* Subscription Information */}
                <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6">
                  <p className="text-blue-700 text-sm">See what subscription plans this API provides.</p>
                </div>

                {/* Mobile Provider Info Toggle */}
                <div className="md:hidden mb-6 border-b border-gray-200 pb-4">
                  <button
                    className="flex justify-between items-center w-full"
                    onClick={() => setProviderInfoExpanded(!providerInfoExpanded)}
                  >
                    <span className="font-medium">Provider Info</span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${providerInfoExpanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  {providerInfoExpanded && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="text-sm text-gray-500 mb-2">API Creator</h4>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center mr-2">
                            <span className="font-medium">A</span>
                          </div>
                          <Link to="/user/apiheya" className="text-gray-700 hover:text-blue-600">
                            by apiheya
                          </Link>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm text-gray-500 mb-2">Subscribers</h4>
                        <p className="text-gray-700">5468 Subs</p>
                      </div>

                      <div>
                        <h4 className="text-sm text-gray-500 mb-2">Category</h4>
                        <div className="inline-block bg-red-50 text-red-700 rounded-md px-2 py-1 text-sm">Travel</div>
                      </div>

                      <button className="w-full bg-blue-500 text-white py-2 rounded-md font-medium text-sm">
                        Sign Up to Contact Provider
                      </button>

                      <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-md font-medium flex items-center justify-center text-sm">
                        <Bell className="h-4 w-4 mr-2" />
                        Get Notifications
                      </button>
                    </div>
                  )}
                </div>

                {/* API Overview */}
                <div className="mb-8">
                  <h2 className="text-xl font-medium mb-4">API Overview</h2>
                  <p className="text-sm text-gray-700 mb-4">
                    <i>This API helps to query prices for real-time flights, hotels, rental cars, etc... to create a travel
                    website like the skyscanner.com or booking.com, flight search, cheap flights. This API reproduces
                    public data on real time basis.</i>
                  </p>
                </div>

                {/* Sky Scrapper API V1 Overview */}
                <div className="mb-8">
                  <h2 className="text-xl font-medium mb-4">Sky Scrapper API V1 Overview</h2>
                  <p className="text-sm text-gray-700 mb-4">
                    Welcome to Sky Scrapper's Web API v1! This API is RESTful, fully featured, and easy to integrate
                    with.
                  </p>
                </div>

                {/* How to use */}
                <div className="mb-8">
                  <h2 className="text-xl font-medium mb-4">How to use Sky Scrapper API</h2>
                </div>

                {/* Flights Endpoints */}
                <div className="mb-8">
                  <h2 className="text-xl font-medium mb-4">1. Flights Endpoints</h2>
                  <p className="text-sm text-gray-700 mb-4">
                    Our Flights Live Prices API enables you to search for flight live prices.
                  </p>

                  {/* 1.1 Get Near By Airports */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">1.1 Get Near By Airports</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      This endpoint makes it possible to obtain all nearby airports according to the latitude and
                      longitude provided. <span className="font-medium">Path</span>{" "}
                      <span className="bg-gray-100 text-pink-600 px-2 py-1 rounded text-sm font-mono">
                        api/v1/flights/getNearByAirports
                      </span>
                    </p>

                    <div className="text-sm mb-4">
                      <span className="font-medium mb-2">Required Parameters lat</span> :- Latitude of the place of search
                      <span className="font-medium"> lng :-</span> Longitude of the place of search
                    </div>

                    <div className='text-sm w-180'>
                      <h4 className="font-medium mb-2">Response</h4>
                      <span className="text-sm bg-gray-100 text-pink-600 px-2 py-1 rounded font-mono">
                        {`{ "status": true, "timestamp": 1692098479952, "data": { "current": { "skyId": "BOM", "entityId": "95673320", "presentation": { "title": "Mumbai", "suggestionTitle": "Mumbai (BOM)", "subtitle": "India" }, "navigation": { "entityId": "95673320", "entityType": "AIRPORT", "localizedName": "Mumbai", "relevantFlightParams": { "skyId": "BOM", "entityId": "95673320", "flightPlaceType": "AIRPORT", "localizedName": "Mumbai" }, "relevantHotelParams": { "entityId": "27539520", "entityType": "CITY", "localizedName": "Mumbai" } } }, "nearby": [], "recent": [] } }`}
                      </span>
                    </div>
                  </div>

                  {/* 1.1 Search Airports */}
                  <div className="mb-6">
                    <span className="text-lg font-medium mb-2">1.2 Search Airports</span>
                    <p className="text-sm text-gray-700 mb-4">
                    By using this endpoint, all nearby airports can be obtained based on the provided city, address, place name, state, etc. <span className="font-medium">Path</span>{" "}
                      <span className="bg-gray-100 text-pink-600 px-2 py-1 rounded text-sm font-mono">
                        api/v1/flights/searchAirport
                      </span>
                    </p>

                    <div className="text-sm mb-4">
                      <span className="text-sm font-medium mb-2">Required Parameters query</span> :- Object containing parameters to automatically search for flights.
                    </div>

                    <div className='text-sm w-180'>
                      <h4 className="font-medium mb-2">Response</h4>
                      <span className="bg-gray-100 text-pink-600 px-2 py-1 rounded text-sm font-mono">
                        {`{ "status": true, "timestamp": 1692098786310, "data": [ { "skyId": "NYCA", "entityId": "27537542", "presentation": { "title": "New York", "suggestionTitle": "New York (Any)", "subtitle": "United States" }, "navigation": { "entityId": "27537542", "entityType": "CITY", "localizedName": "New York", "relevantFlightParams": { "skyId": "NYCA", "entityId": "27537542", "flightPlaceType": "CITY", "localizedName": "New York" }, "relevantHotelParams": { "entityId": "27537542", "entityType": "CITY", "localizedName": "New York" } } }, { "skyId": "EWR", "entityId": "95565059", "presentation": { "title": "New York Newark", "suggestionTitle": "New York Newark (EWR)", "subtitle": "United States" }, "navigation": { "entityId": "95565059", "entityType": "AIRPORT", "localizedName": "New York Newark", "relevantFlightParams": { "skyId": "EWR", "entityId": "95565059", "flightPlaceType": "AIRPORT", "localizedName": "New York Newark" }, "relevantHotelParams": { "entityId": "27537542", "entityType": "CITY", "localizedName": "New York" } } }, { "skyId": "JFK", "entityId": "95565058", "presentation": { "title": "New York John F. Kennedy", "suggestionTitle": "New York John F. Kennedy (JFK)", "subtitle": "United States" }, "navigation": { "entityId": "95565058", "entityType": "AIRPORT", "localizedName": "New York John F. Kennedy", "relevantFlightParams": { "skyId": "JFK", "entityId": "95565058", "flightPlaceType": "AIRPORT", "localizedName": "New York John F. Kennedy" }, "relevantHotelParams": { "entityId": "27537542", "entityType": "CITY", "localizedName": "New York" } } }, { "skyId": "LGA", "entityId": "95565057", "presentation": { "title": "New York LaGuardia", "suggestionTitle": "New York LaGuardia (LGA)", "subtitle": "United States" }, "navigation": { "entityId": "95565057", "entityType": "AIRPORT", "localizedName": "New York LaGuardia", "relevantFlightParams": { "skyId": "LGA", "entityId": "95565057", "flightPlaceType": "AIRPORT", "localizedName": "New York LaGuardia" }, "relevantHotelParams": { "entityId": "27537542", "entityType": "CITY", "localizedName": "New York" } } }, { "skyId": "SWF", "entityId": "95566280", "presentation": { "title": "Stewart International", "suggestionTitle": "Stewart International (SWF)", "subtitle": "United States" }, "navigation": { "entityId": "95566280", "entityType": "AIRPORT", "localizedName": "Stewart International", "relevantFlightParams": { "skyId": "SWF", "entityId": "95566280", "flightPlaceType": "AIRPORT", "localizedName": "Stewart International" }, "relevantHotelParams": { "entityId": "27537542", "entityType": "CITY", "localizedName": "New York" } } } ] }`}
                      </span>
                    </div>
                  </div>


                {/* 1.1 Get Near By Airports */}
                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">1.3 Get Near By Airports</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      This endpoint makes it possible to obtain all nearby airports according to the latitude and longitude provided. <span className="font-medium">Path</span>{" "}
                      <span className="bg-gray-100 text-pink-600 px-2 py-1 rounded text-sm font-mono">
                        api/v1/flights/searchFlights
                      </span>
                    </p>

                    <div className="text-sm mb-4">
                      <span className="font-medium mb-2">Required Parameters originSkyId</span> :- The SkyId for the origin airport. To retrieve SkyId, please use 
                      <span className="bg-gray-100 text-pink-600 px-2 py-1 rounded text-sm font-mono">
                       api/v1/flights/searchAirport
                      </span> or 
                      <span className="bg-gray-100 text-pink-600 px-2 py-1 rounded text-sm font-mono">
                        api/v1/flights/getNearByAirports
                      </span> and search for <span className='font-medium'>SkyId</span> parameter. <span className='font-medium'>destinationSkyId</span> :- The SkyId for the destination airport. To retrieve SkyId, please use <span className="bg-gray-100 text-pink-600 px-2 py-1 rounded text-sm font-mono">
                      api/v1/flights/searchAirport
                      </span> or <span className="bg-gray-100 text-pink-600 px-2 py-1 rounded text-sm font-mono">
                      api/v1/flights/getNearByAirports
                      </span> and search for <span className='font-medium'>SkyId</span> parameter. <span className='font-medium'>originEntityId</span> :- The entityId for the origin airport. To retrieve entityId, please use
                      <span className="bg-gray-100 text-pink-600 px-2 py-1 rounded text-sm font-mono">
                        api/v1/flights/searchAirport
                      </span> or <span className="bg-gray-100 text-pink-600 px-2 py-1 rounded text-sm font-mono">
                        api/v1/flights/getNearByAirports
                      </span> and search for <span className='font-medium'>entityId</span> parameter. <span className='font-medium'>destinationEntityId</span> :- The entityId for the destination airport. To retrieve entityId, please use <span className="bg-gray-100 text-pink-600 px-2 py-1 rounded text-sm font-mono">
                        api/v1/flights/searchAirport
                      </span> or <span className="bg-gray-100 text-pink-600 px-2 py-1 rounded text-sm font-mono">
                        api/v1/flights/getNearByAirports
                      </span> and search for entityId parameter. date :- The travel date should be in the format of YYYY-MM-DD

                      
                    </div>

                    <div className='mb-4 text-sm'>
                      <span className="font-medium mb-2">Optional Parameters returnDate</span>
                      :- <span className='font-medium'>adults</span> :- <span className='font-medium'>cabinClass</span> :- <span className='font-medium'>sortBy</span> :- <span className='font-medium'>childrens</span> :- <span className='font-medium'>infants</span> :- <span className='font-medium'>currency</span> :- <span className='font-medium'>market</span> :- <span className='font-medium'>countryCode</span> :-
                    </div>

                    <div className='text-sm w-180'>
                      <h4 className="font-medium mb-2">Response</h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Hidden on mobile */}
              <div className="md:w-[45%] border-l border-gray-200 p-4 hidden lg:block">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-4">Provider Info</h3>
                  </div>

                  <div className="mx-20">
                    <div className="mb-6">
                      <h4 className="text-xs font-bold mb-2">API Creator</h4>
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center mr-2">
                          <span className="font-medium">A</span>
                        </div>
                        <Link to="/user/apiheya" className="text-gray-700 hover:text-blue-600">
                          by apiheya
                        </Link>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold mb-2">Subscribers</h4>
                      <p className="text-xs text-gray-700 mb-6">5468 Subs</p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold mb-2">Category</h4>
                      <div className="text-xs inline-block bg-red-50 text-red-700 rounded-md px-2 py-1 mb-6">Travel</div>
                    </div>

                    <button className="text-xs w-full bg-blue-500 text-white py-2 rounded-md font-medium mb-2">
                      Sign Up to Contact Provider
                    </button>

                    <button className="text-xs w-full bg-gray-100 text-gray-700 py-2 rounded-md font-medium flex items-center justify-center">
                      <Bell className="h-4 w-4 mr-2" />
                      Get Notifications
                    </button>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        endpointSearch={endpointSearch}
        setEndpointSearch={setEndpointSearch}
        filteredEndpoints={filteredEndpoints}
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        getSectionEndpoints={getSectionEndpoints}
      />
    </div>
  )
}