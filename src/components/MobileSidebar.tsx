import React from 'react'
import { ChevronRight, Search, Info } from "lucide-react"

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
  endpointSearch: string
  setEndpointSearch: (value: string) => void
  filteredEndpoints: any[]
  expandedSections: {
    flights: boolean
    hotels: boolean
    carHire: boolean
  }
  toggleSection: (section: "flights" | "hotels" | "carHire") => void
  getSectionEndpoints: (section: "general" | "flights" | "hotels" | "carHire") => any[]
}

export default function MobileSidebar({
  isOpen,
  onClose,
  endpointSearch,
  setEndpointSearch,
  filteredEndpoints,
  expandedSections,
  toggleSection,
  getSectionEndpoints,
}: MobileSidebarProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white z-40 overflow-y-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-medium">Endpoints</h2>
        <button onClick={onClose} className="p-2">
          <ChevronRight className="h-6 w-6 text-gray-500" />
        </button>
      </div>

      <div className="p-4">
        <div className="relative mb-4">
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
              className="flex items-center text-sm text-gray-600 hover:bg-gray-100 rounded p-2"
            >
              <span className="text-xs text-blue-500 font-mono mr-2">{endpoint.method}</span>
              <span className="text-gray-700">{endpoint.path}</span>
              <Info className="h-4 w-4 ml-auto text-gray-400" />
            </div>
          ))}

          {/* Flights Dropdown */}
          {getSectionEndpoints("flights").length > 0 && (
            <div className="border-t border-gray-100 pt-2">
              <div
                className="flex items-center text-sm text-gray-600 hover:bg-gray-100 rounded p-2 cursor-pointer"
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
                    className="flex items-center text-sm text-gray-600 hover:bg-gray-100 rounded p-2"
                  >
                    <span className="text-xs text-blue-500 font-mono mr-2">{endpoint.method}</span>
                    <span className="text-gray-700">{endpoint.path}</span>
                    <Info className="h-4 w-4 ml-auto text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hotels Dropdown */}
          {getSectionEndpoints("hotels").length > 0 && (
            <div className="border-t border-gray-100 pt-2">
              <div
                className="flex items-center text-sm text-gray-600 hover:bg-gray-100 rounded p-2 cursor-pointer"
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
                    className="flex items-center text-sm text-gray-600 hover:bg-gray-100 rounded p-2"
                  >
                    <span className="text-xs text-blue-500 font-mono mr-2">{endpoint.method}</span>
                    <span className="text-gray-700">{endpoint.path}</span>
                    <Info className="h-4 w-4 ml-auto text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Car Hire Dropdown */}
          {getSectionEndpoints("carHire").length > 0 && (
            <div className="border-t border-gray-100 pt-2">
              <div
                className="flex items-center text-sm text-gray-600 hover:bg-gray-100 rounded p-2 cursor-pointer"
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
                    className="flex items-center text-sm text-gray-600 hover:bg-gray-100 rounded p-2"
                  >
                    <span className="text-xs text-blue-500 font-mono mr-2">{endpoint.method}</span>
                    <span className="text-gray-700">{endpoint.path}</span>
                    <Info className="h-4 w-4 ml-auto text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results message */}
          {endpointSearch && filteredEndpoints.length === 0 && (
            <div className="text-center py-4 text-gray-500">No endpoints found matching "{endpointSearch}"</div>
          )}
        </div>
      </div>
    </div>
  )
}
