# E-Commerce Website

## Overview
This project is a modern e-commerce website designed to showcase products and facilitate user-friendly shopping experiences. The site leverages robust APIs for its dynamic features and incorporates cutting-edge technologies for smooth performance and appealing design.

## Features

### Authentication
- User login and signup, password recovery, and updates.
- Implemented with **Formik** and **Yup** for secure and efficient form handling.

### Design
- Styled with **Tailwind CSS** for a responsive and sleek UI.
- Enhanced with libraries like:
  - **react-loader-spinner** for loading animations.
  - **react-slick slider** for carousels.
  - **react-hot-toast** for notifications.

### Product Display
- Home page showcasing products with detailed product pages.
- Related products displayed on individual product pages.
- Dynamic data fetching and management using **TanStack React Query**.

### Shopping Features
- Add, remove, increment, decrement, and clear items in the cart.
- User-specific cart management via APIs.
- Wishlist to manage desired products.

### Payment Options
- Supports payments via card or cash.

### Additional Pages
1. **Categories Page**:
   - Displays a list of categories.
2. **Brands Page**:
   - Displays a list of brands.
3. **Profile Page**:
   - Manage user information and addresses.

### Other Highlights
- Built using **Vite** for optimized performance.
- Iconography powered by **Font Awesome**.

## Installation
To run the project locally:
1. Clone the repository.
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Start the development server:  
   ```bash
   npm run dev
   ```

## Technologies Used
- **React** for the frontend framework.
- **React Router DOM** for routing.
- **Formik** and **Yup** for authentication forms.
- **TanStack React Query** for data fetching and caching.
- **Axios** for API handling.  
- **Tailwind CSS** for styling.
- **Font Awesome** for icons.
- Additional packages:  
  - **react-loader-spinner**  
  - **react-slick slider**  
  - **react-hot-toast**  

## API Integration
The website relies heavily on APIs for:
- Dynamic product fetching and management.
- User-specific cart and wishlist.
- Order and payment handling.