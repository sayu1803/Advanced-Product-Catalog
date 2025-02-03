import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import SearchAutocomplete from "./SearchAutocomplete"
import DarkModeToggle from "./DarkModeToggle"

const Header = () => {
  const { cart } = useCart()

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg dark:from-gray-800 dark:to-gray-900"
    >
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link to="/" className="text-3xl font-extrabold tracking-tight">
          <span className="text-yellow-300">Shop</span>
          <span className="text-pink-300">Smart</span>
        </Link>
        <div className="flex-1 mx-8 relative">
          <SearchAutocomplete />
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/cart"
            className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2 hover:bg-opacity-30 transition-all duration-300"
          >
            <ShoppingBag className="h-6 w-6 mr-2" />
            <span className="font-semibold">Cart ({cart.length})</span>
          </Link>
          <DarkModeToggle />
        </div>
      </div>
    </motion.header>
  )
}

export default Header

