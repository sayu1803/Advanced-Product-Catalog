import { useState, useEffect, useRef } from "react"
import { useFilter } from "../contexts/FilterContext"
import { Search } from "lucide-react"

const SearchAutocomplete = () => {
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { filters, updateFilters } = useFilter()
  const searchRef = useRef(null)

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (filters.search.length > 2) {
        try {
          const response = await fetch(`https://dummyjson.com/products/search?q=${filters.search}&limit=5`)
          const data = await response.json()
          setSuggestions(data.products)
        } catch (error) {
          console.error("Error fetching suggestions:", error)
        }
      } else {
        setSuggestions([])
      }
    }

    fetchSuggestions()
  }, [filters.search])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearchChange = (e) => {
    updateFilters({ search: e.target.value })
    setShowSuggestions(true)
  }

  const handleSuggestionClick = (suggestion) => {
    updateFilters({ search: suggestion.title })
    setShowSuggestions(false)
  }

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          className="text-gray-950 w-full px-4 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={filters.search}
          onChange={handleSearchChange}
          onFocus={() => setShowSuggestions(true)}
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className=" text-gray-950 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchAutocomplete

