import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [cartId, setCartId] = useState(null)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("https://dummyjson.com/carts/1")
        const data = await response.json()
        setCart(data.products)
        setCartId(data.id)
      } catch (error) {
        console.error("Error fetching cart:", error)
      }
    }

    fetchCart()
  }, [])

  const addToCart = async (product) => {
    try {
      const response = await fetch("https://dummyjson.com/carts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1,
          products: [
            {
              id: product.id,
              quantity: 1,
            },
          ],
        }),
      })
      const data = await response.json()

      // Merge the new product with existing cart items
      setCart((prevCart) => {
        const existingItemIndex = prevCart.findIndex((item) => item.id === product.id)
        if (existingItemIndex !== -1) {
          // If the item already exists, update its quantity
          const updatedCart = [...prevCart]
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: updatedCart[existingItemIndex].quantity + 1,
          }
          return updatedCart
        } else {
          // If it's a new item, add it to the cart
          return [...prevCart, { ...product, quantity: 1 }]
        }
      })
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`https://dummyjson.com/carts/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: cart.filter((item) => item.id !== productId),
        }),
      })
      const data = await response.json()
      setCart(data.products)
    } catch (error) {
      console.error("Error removing from cart:", error)
    }
  }

  const updateQuantity = async (productId, quantity) => {
    try {
      const updatedProducts = cart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item,
      )
      const response = await fetch(`https://dummyjson.com/carts/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: updatedProducts,
        }),
      })
      const data = await response.json()
      setCart(data.products)
    } catch (error) {
      console.error("Error updating quantity:", error)
    }
  }

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

