# ZenCart E-Commerce Application

ZenCart is a modern e-commerce application that i built with Vue.js, featuring a responsive user interface and dynamic product filtering and sorting capabilities. This project leverages the Fake Store API to provide a seamless shopping experience with a clean and functional design.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Usage Examples](#usage-examples)
- [Contributing](#contributing)
- [License](#license)

## Introduction

ZenCart is designed to showcase a variety of products and offer users the ability to filter and sort them based on their preferences. The application includes a responsive layout with a header, product grid, filter and sort components, and detailed product views. It is built using Vue.js and styled with CSS to ensure a modern and user-friendly interface.

## Technologies Used

- **Vue.js**: The core framework used for building the application's user interface.
- **Vue Router**: For handling routing and navigation.
- **CSS**:  Used for styling the application.
- **Fake Store API**: A mock API providing product data for the application.
- **Vue Router**: For handling routing within the application.
- **Fetch API**: For making HTTP requests to the backend.
- **JWT Authentication**: For secure user login and session management.
- **Vercel**: For deployment.

## Project Structure

- **`App.vue`**: The root component that includes the `Header` and a `router-view` for rendering different pages.
- **`Header.vue`**: The navigation header with links to different sections of the application.
- **`FilterComponent.vue`**: A component for filtering and searching products.
- **`SortComponent.vue`**: A component for sorting products by price.
- **`ProductDetails.vue`**: A component for displaying detailed information about a selected product.
- **`ProductGrid.vue`**: A component for displaying a grid of products.
- **`SortComponent.vue`**: A component for sorting products by different criteria.
- **`Login.vue`**: This component is crucial for user authentication, allowing users to log in and access protected areas of our application.
- **`Cart.vue`**: The Cart component manages and displays the user's shopping cart, including functionality for viewing items, updating quantities, removing items, and proceeding to checkout
-**`Wishlist.vue`**: Designed to manage and display a user's wishlist of products. This component provides functionality for adding products to the wishlist, viewing the wishlist, and managing the items within it.
-**`Comparison.vue`**: This component is designed to help users compare multiple products side by side, making it easier to decide which product best fits their needs.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   npm install
   git clone https://github.com/KoketsoMoilwe20/JSF-Portfolio-Piece-KOKMOI366-JSE2407-GroupC-Koketso-Moilwe-JSF04.git
   cd zencart

2. **Install Dependencies**

    Ensure you have Node.js and npm installed, then run: npm install

3. **Run the Application**

    npm run dev (The application will be available at ` http://localhost:5180/`)

# Hosted Application

You can view the live application at: https://jsf-portfolio-piece-kokmoi-366-jse-2407-group-c-koke-e4gwbkl8e.vercel.app/?searchQuery=&category=&sortOption=

# YouTube Video

Watch the YouTube video explaining the code: https://youtu.be/ANkMqEskRO8

# Usage Examples

+ **Filtering Products:**
    To use the filter component, enter a search query in the search bar and select a category from the dropdown. The product grid will update based on the selected filters.

+ **Sorting Products**

    Use the sort component to choose how products should be ordered. Options include sorting by price from low to high or high to low.

+ **Viewing Product Details**

    Click on any product in the grid to view detailed information, including an image, title, price, description, and rating.


# Contributing

If you'd like to contribute to the project, please fork the repository and submit a pull request. 