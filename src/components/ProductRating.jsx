import { useState } from "react"
import { Star } from "lucide-react"

const ProductRating = ({ initialRating, onRate }) => {
  const [rating, setRating] = useState(initialRating)
  const [hover, setHover] = useState(0)

  const handleRate = (newRating) => {
    setRating(newRating)
    onRate(newRating)
  }

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1
        return (
          <Star
            key={index}
            className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
              ratingValue <= (hover || rating) ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleRate(ratingValue)}
          />
        )
      })}
    </div>
  )
}

export default ProductRating

