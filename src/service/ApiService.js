// src/ApiService.js
import axios from 'axios';

const API_URL = 'https://api.example.com'; // Replace with your API URL

const apiService = {
    getData: async () => {
        try {
            const response = await axios.get(`${API_URL}/data`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    },
    postData: async (data) => {
        try {
            const response = await axios.post(`${API_URL}/data`, data);
            return response.data;
        } catch (error) {
            console.error('Error posting data:', error);
            throw error;
        }
    }
};

export default apiService;
