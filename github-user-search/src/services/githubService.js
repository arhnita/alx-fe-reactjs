import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_GITHUB_API_URL || 'https://api.github.com';
const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    ...(API_KEY && { 'Authorization': `token ${API_KEY}` }),
  },
});

const githubService = {
  fetchUserData: async (username) => {
    try {
      const response = await axiosInstance.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  },

  searchUsers: async (username) => {
    try {
      const response = await axiosInstance.get(`/search/users?q=${encodeURIComponent(username)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  },
};

export default githubService;