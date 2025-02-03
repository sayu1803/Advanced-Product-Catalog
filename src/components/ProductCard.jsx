import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Star, ShoppingCart, AlertCircle } from "lucide-react"
import { useProductAvailability } from "../hooks/useProductAvailability"

const ProductCard = React.memo(({ product, addToCart }) => {
  const { isAvailable, isLoading } = useProductAvailability(product.id)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden h-[420px] flex flex-col transform hover:scale-105 transition-transform duration-300"
    >
      <Link to={`/product/${product.id}`} className="block h-56 overflow-hidden">
        <img src={product.thumbnail || "/placeholder.svg"} alt={product.title} className="w-full h-full object-cover" />
      </Link>
      <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-white to-gray-50">
        <Link to={`/product/${product.id}`} className="block flex-grow">
          <h2 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-indigo-600 transition-colors">
            {product.title}
          </h2>
        </Link>
        <div className="mt-auto space-y-3">
          <p className="text-2xl font-bold text-indigo-600">${product.price.toFixed(2)}</p>
          <div className="flex items-center">
            <Star className="text-yellow-400 w-5 h-5 mr-1" />
            <span className="font-medium">{product.rating.toFixed(1)}</span>
          </div>
          {isLoading ? (
            <div className="animate-pulse bg-gray-200 h-10 rounded-lg"></div>
          ) : isAvailable ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(product)}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </motion.button>
          ) : (
            <div className="w-full bg-red-100 text-red-600 py-3 px-4 rounded-lg font-semibold flex items-center justify-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Out of Stock
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
})

ProductCard.displayName = "ProductCard"

export default ProductCard

