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
- **CSS**:  Used for styling the application.
- **Fake Store API**: A mock API providing product data for the application.
- **Vue Router**: For handling routing within the application.

## Project Structure

- **`App.vue`**: The root component that includes the `Header` and a `router-view` for rendering different pages.
- **`Header.vue`**: The navigation header with links to different sections of the application.
- **`FilterComponent.vue`**: A component for filtering and searching products.
- **`SortComponent.vue`**: A component for sorting products by price.
- **`ProductDetails.vue`**: A component for displaying detailed information about a selected product.
- **`ProductGrid.vue`**: A component for displaying a grid of products.
- **`SortComponent.vue`**: A component for sorting products by different criteria.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   npm install
   git clone https://github.com/KoketsoMoilwe20/Module-4-KOKMOI366-JSE2407-GroupC-Koketso-Moilwe-JSF03.git
   cd zencart

2. **Install Dependencies**

    Ensure you have Node.js and npm installed, then run: npm install

3. **Run the Application**

    npm run dev (The application will be available at `http://localhost:5174/`)

# Usage Examples

+ **Filtering Products:**
    To use the filter component, enter a search query in the search bar and select a category from the dropdown. The product grid will update based on the selected filters.

+ **Sorting Products**

    Use the sort component to choose how products should be ordered. Options include sorting by price from low to high or high to low.

+ **Viewing Product Details**

    Click on any product in the grid to view detailed information, including an image, title, price, description, and rating.


# Contributing

If you'd like to contribute to the project, please fork the repository and submit a pull request. 