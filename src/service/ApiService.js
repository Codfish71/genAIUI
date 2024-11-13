// src/ApiService.js
import axios from 'axios';
import data from './tradeData.json';

const API_URL = 'https://api.example.com'; // Replace with your API URL

const apiService = {
    getData: async () => {
        try {
            console.log("Getting Trade Datain API SERVICE")
            // const response = await axios.get(`${API_URL}/data`);
            // const response = await fetch('');
            // const result = await response.json()
            return data.data;
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
