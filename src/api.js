// src/services/api.js
const API_URL = 'https://fakestoreapi.com';

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Simulated API calls for wishlist (using localStorage)
export const syncWishlist = async (userId, wishlist) => {
  localStorage.setItem(`wishlist_${userId}`, JSON.stringify(wishlist));
  return wishlist;
};

export const fetchWishlist = async (userId) => {
  const wishlist = localStorage.getItem(`wishlist_${userId}`);
  return wishlist ? JSON.parse(wishlist) : [];
};