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

  searchUsers: async (searchParams) => {
    try {
      let query = '';

      if (searchParams.username) {
        query += searchParams.username;
      }

      if (searchParams.location) {
        query += ` location:${searchParams.location}`;
      }

      if (searchParams.minRepos) {
        query += ` repos:>=${searchParams.minRepos}`;
      }

      const params = {
        q: query.trim(),
        per_page: searchParams.perPage || 30,
        page: searchParams.page || 1
      };

      const response = await axiosInstance.get('/search/users', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  },

  advancedSearchUsers: async (searchCriteria) => {
    try {
      const { username, location, minRepos, page = 1 } = searchCriteria;

      let query = '';
      if (username) query += username;
      if (location) query += ` location:${location}`;
      if (minRepos) query += ` repos:>=${minRepos}`;

      const response = await axiosInstance.get(`https://api.github.com/search/users?q=${encodeURIComponent(query.trim())}&page=${page}&per_page=30`);
      return response.data;
    } catch (error) {
      console.error('Error in advanced search:', error);
      throw error;
    }
  },
};

export default githubService;