import { useFilter } from "../contexts/FilterContext"
import { motion } from "framer-motion"
import { Filter, RefreshCw } from "lucide-react"

const FilterSidebar = () => {
  const { filters, updateFilters, resetFilters } = useFilter()

  const handleCategoryChange = (e) => {
    updateFilters({ category: e.target.value })
  }

  const handlePriceChange = (e) => {
    updateFilters({ [e.target.name]: Number.parseFloat(e.target.value) })
  }

  const handleRatingChange = (e) => {
    updateFilters({ rating: Number.parseFloat(e.target.value) })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full md:w-72 mb-6 md:mb-0 md:mr-8 bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center mb-6">
        <Filter className="w-6 h-6 text-indigo-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
      </div>
      <div className="space-y-6">
        <div>
          <label htmlFor="category" className="block mb-2 font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={filters.category}
            onChange={handleCategoryChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          >
            <option value="">All Categories</option>
            <option value="smartphones">Smartphones</option>
            <option value="laptops">Laptops</option>
            <option value="fragrances">Fragrances</option>
            <option value="skincare">Skincare</option>
            <option value="groceries">Groceries</option>
          </select>
        </div>
        <div>
          <label htmlFor="minPrice" className="block mb-2 font-medium text-gray-700">
            Min Price
          </label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={filters.minPrice}
            onChange={handlePriceChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" className="block mb-2 font-medium text-gray-700">
            Max Price
          </label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={filters.maxPrice === Number.POSITIVE_INFINITY ? "" : filters.maxPrice}
            onChange={handlePriceChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          />
        </div>
        <div>
          <label htmlFor="rating" className="block mb-2 font-medium text-gray-700">
            Minimum Rating
          </label>
          <input
            type="range"
            id="rating"
            min="0"
            max="5"
            step="0.1"
            value={filters.rating}
            onChange={handleRatingChange}
            className="w-full"
          />
          <span className="block text-center mt-2 font-semibold text-indigo-600">{filters.rating.toFixed(1)}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetFilters}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Reset Filters
        </motion.button>
      </div>
    </motion.div>
  )
}

export default FilterSidebar

