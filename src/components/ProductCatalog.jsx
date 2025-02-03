import { useState, useEffect, useCallback, useRef } from "react"
import { useCart } from "../contexts/CartContext"
import { useFilter } from "../contexts/FilterContext"
import ProductCard from "./ProductCard"
import FilterSidebar from "./FilterSidebar"
import { useVirtualizer } from "@tanstack/react-virtual"

const PRODUCTS_PER_ROW = 4

const ProductCatalog = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [skip, setSkip] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const { filters } = useFilter()
  const { addToCart } = useCart()
  const parentRef = useRef()

  const fetchProducts = useCallback(async () => {
    if (!hasMore || loading) return

    setLoading(true)
    setError(null)
    try {
      let url = `https://dummyjson.com/products?limit=30&skip=${skip}`

      if (filters.search) {
        url = `https://dummyjson.com/products/search?q=${filters.search}&limit=30&skip=${skip}`
      }

      if (filters.category && filters.category !== "") {
        url = `https://dummyjson.com/products/category/${filters.category}?limit=30&skip=${skip}`
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }
      const data = await response.json()

      setProducts((prevProducts) => {
        const newProducts = [...prevProducts, ...data.products]
        const uniqueProducts = Array.from(new Set(newProducts.map((p) => p.id))).map((id) =>
          newProducts.find((p) => p.id === id),
        )
        return uniqueProducts
      })
      setHasMore(data.products.length > 0 && data.total > skip + data.products.length)
      setSkip((prevSkip) => prevSkip + data.products.length)
    } catch (error) {
      console.error("Error fetching products:", error)
      setError("Failed to load products. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [skip, hasMore, loading, filters.search, filters.category])

  useEffect(() => {
    setProducts([])
    setSkip(0)
    setHasMore(true)
    setError(null)
  }, [filters])

  useEffect(() => {
    if (skip === 0) {
      fetchProducts()
    }
  }, [fetchProducts, skip])

  const filteredProducts = products.filter((product) => {
    return (
      product.price >= filters.minPrice &&
      (filters.maxPrice === Number.POSITIVE_INFINITY || product.price <= filters.maxPrice) &&
      product.rating >= filters.rating
    )
  })

  // Convert filtered products into rows of 4
  const rows = []
  for (let i = 0; i < filteredProducts.length; i += PRODUCTS_PER_ROW) {
    rows.push(filteredProducts.slice(i, i + PRODUCTS_PER_ROW))
  }

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(filteredProducts.length / PRODUCTS_PER_ROW),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 400,
    overscan: 5,
  })

  const loadMoreItems = useCallback(() => {
    if (!loading && hasMore) {
      fetchProducts()
    }
  }, [loading, hasMore, fetchProducts])

  useEffect(() => {
    const lastItem = rowVirtualizer.getVirtualItems()[rowVirtualizer.getVirtualItems().length - 1]
    if (!loading && hasMore && lastItem && lastItem.index >= rows.length - 1) {
      loadMoreItems()
    }
  }, [rowVirtualizer.getVirtualItems(), rows.length, loadMoreItems, loading, hasMore])

  return (
    <div className="flex flex-col md:flex-row">
      <FilterSidebar />
      <div className="flex-1 px-6">
        <h1 className="text-3xl font-bold mb-6">Product Catalog</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {filteredProducts.length === 0 && !loading && !error && (
          <div className="text-center mt-8">No products found. Try adjusting your filters.</div>
        )}
        <div ref={parentRef} className="h-[800px] overflow-auto">
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index] || []
              return (
                <div
                  key={virtualRow.index}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {row.map((product) => (
                      <ProductCard key={product.id} product={product} addToCart={addToCart} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        {loading && <div className="text-center mt-8">Loading more products...</div>}
        {!hasMore && filteredProducts.length > 0 && <div className="text-center mt-8">No more products to load.</div>}
      </div>
    </div>
  )
}

export default ProductCatalog

