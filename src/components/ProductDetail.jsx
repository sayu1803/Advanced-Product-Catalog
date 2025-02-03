import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { motion } from "framer-motion"
import { ShoppingCart, Truck, Shield, AlertCircle } from "lucide-react"
import { useProductAvailability } from "../hooks/useProductAvailability"
import ProductCard from "./ProductCard"
import ProductRating from "./ProductRating"

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const { isAvailable, isLoading } = useProductAvailability(Number(id))

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        const data = await response.json()
        setProduct(data)

        // Fetch related products
        const relatedResponse = await fetch(`https://dummyjson.com/products/category/${data.category}?limit=4`)
        const relatedData = await relatedResponse.json()
        setRelatedProducts(relatedData.products.filter((p) => p.id !== data.id))
      } catch (error) {
        console.error("Error fetching product:", error)
      }
      setLoading(false)
    }

    fetchProduct()
  }, [id])

  const handleRate = async (newRating) => {
    // In a real application, you would send this rating to your backend
    console.log(`User rated product ${id} with ${newRating} stars`)
    // For this example, we'll just update the local state
    setProduct((prev) => ({ ...prev, rating: (prev.rating + newRating) / 2 }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Product not found</h2>
        <p className="text-gray-600">Sorry, we couldn't find the product you're looking for.</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2">
            <img
              className="h-96 w-full object-cover md:h-full"
              src={product.thumbnail || "/placeholder.svg"}
              alt={product.title}
            />
          </div>
          <div className="p-8 md:w-1/2">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">{product.category}</div>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 leading-tight">{product.title}</h1>
              <p className="mt-4 text-gray-600">{product.description}</p>
              <div className="mt-6">
                <span className="text-5xl font-bold text-indigo-600">${product.price.toFixed(2)}</span>
                <span className="ml-2 text-2xl text-gray-500 line-through">
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
                <span className="ml-2 text-lg text-green-600 font-semibold">{product.discountPercentage}% off</span>
              </div>
              <div className="mt-6 flex items-center">
                <ProductRating initialRating={product.rating} onRate={handleRate} />
                <span className="ml-2 text-gray-600">({product.rating.toFixed(1)})</span>
              </div>
              <div className="mt-8">
                {isLoading ? (
                  <div className="animate-pulse bg-gray-200 h-14 rounded-lg"></div>
                ) : isAvailable ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(product)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                  >
                    <ShoppingCart className="w-6 h-6 mr-2" />
                    Add to Cart
                  </motion.button>
                ) : (
                  <div className="w-full bg-red-100 text-red-600 py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 mr-2" />
                    Out of Stock
                  </div>
                )}
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Truck className="w-6 h-6 text-indigo-600 mr-2" />
                  <span className="text-gray-600">Free Shipping</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-indigo-600 mr-2" />
                  <span className="text-gray-600">2 Year Warranty</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Related Products Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

