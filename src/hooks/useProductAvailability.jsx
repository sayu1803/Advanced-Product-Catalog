import { useState, useEffect } from "react"

export const useProductAvailability = (productId) => {
  const [isAvailable, setIsAvailable] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAvailability = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`)
        const data = await response.json()

        
        setIsAvailable(data.stock > 0)
      } catch (error) {
        console.error("Error checking product availability:", error)
        setIsAvailable(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAvailability()

    // Set up polling to check availability every 30 seconds
    const intervalId = setInterval(checkAvailability, 30000)

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [productId])

  return { isAvailable, isLoading }
}

