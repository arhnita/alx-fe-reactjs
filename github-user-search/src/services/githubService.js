const API_BASE_URL = import.meta.env.VITE_APP_GITHUB_API_URL || 'https://api.github.com';
const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

const githubService = {
  searchUsers: async (username) => {
    try {
      const headers = {
        'Accept': 'application/vnd.github.v3+json',
      };

      if (API_KEY) {
        headers['Authorization'] = `token ${API_KEY}`;
      }

      const response = await fetch(`${API_BASE_URL}/search/users?q=${encodeURIComponent(username)}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  },

  getUserDetails: async (username) => {
    try {
      const headers = {
        'Accept': 'application/vnd.github.v3+json',
      };

      if (API_KEY) {
        headers['Authorization'] = `token ${API_KEY}`;
      }

      const response = await fetch(`${API_BASE_URL}/users/${encodeURIComponent(username)}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  },
};

export default githubService;