import axios from 'axios';
import { createCarouselItem, clear, appendCarousel, start } from './carousel.js';

// Your API base URL
const BASE_URL = 'https://api.thecatapi.com/v1/';
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['x-api-key'] = ''; // Replace with your actual API key

// Function to toggle favorite status of an image
export async function toggleFavorite(imgId) {
    try {
        const response = await axios.get(`${BASE_URL}favourites`);
        const favourites = response.data;
        const favorite = favourites.find(fav => fav.image.id === imgId);

        if (favorite) {
            // Remove from favorites
            await axios.delete(`${BASE_URL}favourites/${favorite.id}`);
        } else {
            // Add to favorites
            await axios.post(`${BASE_URL}favourites`, { image_id: imgId });
        }
    } catch (error) {
        console.error("Error toggling favorite:", error);
    }
}

// Add your other functions (e.g., getBreeds, getBreedImages, getBreedInfo) here

// Example event listener for getting favourites
document.getElementById('getFavouritesBtn').addEventListener('click', async () => {
    try {
        const response = await axios.get(`${BASE_URL}favourites`);
        const favourites = response.data;

        clear(); // Clear existing items
        favourites.forEach((fav) => {
            const item = createCarouselItem(fav.image.url, "", fav.image.id);
            appendCarousel(item);
        });

        start(); // Start or restart the carousel
    } catch (error) {
        console.error("Error fetching favourites:", error);
    }
});
