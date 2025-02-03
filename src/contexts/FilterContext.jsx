import { createContext, useContext, useState } from "react"

const FilterContext = createContext()

export const useFilter = () => useContext(FilterContext)

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: Number.POSITIVE_INFINITY,
    rating: 0,
    search: "",
  })

  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }))
  }

  const resetFilters = () => {
    setFilters({
      category: "",
      minPrice: 0,
      maxPrice: Number.POSITIVE_INFINITY,
      rating: 0,
      search: "",
    })
  }

  return <FilterContext.Provider value={{ filters, updateFilters, resetFilters }}>{children}</FilterContext.Provider>
}

