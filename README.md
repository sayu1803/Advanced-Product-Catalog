# Advanced Product Catalog with Dynamic Filtering and Real-Time Data Updates

## Overview

This project is an **Advanced Product Catalog** for an e-commerce platform. It allows users to browse, filter, and view products, manage their shopping cart, and see real-time product availability updates. The project includes a product detail page, dynamic filtering, pagination, and a responsive design.

## Features Implemented

### 1. Product Catalog

- **Display Products**: Fetches and displays a list of products with the following information:
    - **Product Name**
    - **Description**
    - **Price**
    - **Image**
    - **Stock Status**
- **Pagination or Infinite Scrolling**: Implements infinite scrolling to handle large datasets of products.
- **Add to Cart Button**: Each product has an “Add to Cart” button to enable users to add products to their shopping cart.

### 2. Dynamic Filtering

- **Dynamic Filters**: Allows users to filter products based on:
    - **Category** (e.g., Electronics, Clothing)
    - **Price Range** (users can set a price range filter)
    - **Rating** (e.g., show products with a rating of 4 stars and above)
- **Real-Time Updates**: The product list updates immediately when a filter is applied without needing to reload the page.
- **Filter UI/UX**: Provides an easy-to-use filter interface, with appropriate spacing and design for desktop and mobile views.

### 3. Shopping Cart

- **Add/Remove Products**: Allows users to add and remove products from the shopping cart.
- **Cart Summary**: Displays a **cart summary** showing:
    - The **number of items** in the cart.
    - The **total price** of items.
- **Persistence**: Ensures the cart state is preserved across different pages of the site, so users don’t lose their cart items.

### 4. Real-Time Product Availability

- **Polling**: Checks whether products are still in stock while users are browsing.
- **Out of Stock Message**: Displays a **"Product Out of Stock"** message if the product is unavailable when users attempt to add it to the cart.
- **Loading Spinner**: Implements a loading spinner while checking product availability.

### 5. Product Detail Page

- **Product Detail Page**: Displays detailed information when a user clicks on a product:
    - **Larger Product Image**
    - **Detailed Product Description**
    - **Price**
    - **Rating and Reviews**
    - **Stock Status**
- **Related Products Section**: Displays a list of **related products** based on category or tags, fetched from a mock API.

### 6. UI/UX Design (Using TailwindCSS)

- **Responsive Design**: Uses **TailwindCSS** to create a fully responsive design, adapting well to mobile, tablet, and desktop devices.
- **UI Components**: Utilizes Tailwind’s utility classes for:
    - Buttons (e.g., Add to Cart)
    - Forms (e.g., Price range slider, search bar)
    - Cards for products
    - Navigation and filters

### 7. State Management

- **React Context API**: Manages global state for the shopping cart (items in the cart, total price) and active filters (current category, price range, rating).
- **React Hooks**: Uses **useEffect** and **useState** hooks to handle side effects and update the UI when products or filters change.

## Installation Instructions

1. Clone the repository:
     ```sh
     git clone https://github.com/yourusername/ecommerce-task.git
     cd ecommerce-task
     ```

2. Install dependencies:
     ```sh
     npm install
     ```

3. Start the development server:
     ```sh
     npm start
     ```

4. Open your browser and navigate to `http://localhost:3000`.

## Known Issues or Limitations

- Dark mode toggle is not implemented.

## Mock API Links (DummyJSON API)

- **Get Products**: `https://dummyjson.com/products`
- **Get Product by ID**: `https://dummyjson.com/products/{id}`
- **Add Product to Cart**: `https://dummyjson.com/carts/add`
- **Get Cart**: `https://dummyjson.com/carts`
- **Product Search**: `https://dummyjson.com/products/search?q={query}&category={category}&price={minPrice}-{maxPrice}`

## Bonus Features

1. **Search Autocomplete**: Implements an autocomplete feature in the search bar, displaying suggestions as the user types.
2. **Product Ratings**: Adds a rating system to allow users to rate products. Displays the average rating and the number of reviews for each product.

## Live Demo

[Live Demo Link](https://shop-smart-task.netlify.app/)

## Repository

[GitHub Repository](https://github.com/sayu1803/Advanced-Product-Catalog)

## Contact

For any questions or feedback, please contact [mahesh.takey@cadandcart.com](mailto:mahesh.takey@cadandcart.com).
