import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { FilterProvider } from "./contexts/FilterContext";
import Header from "./components/Header";
import ProductCatalog from "./components/ProductCatalog";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <CartProvider>
          <FilterProvider>
            <div className="min-h-screen bg-gray-100">
              <Header />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<ProductCatalog />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                </Routes>
              </main>
            </div>
          </FilterProvider>
        </CartProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
