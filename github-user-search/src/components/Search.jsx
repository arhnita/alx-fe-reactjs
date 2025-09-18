import { useState } from 'react';
import githubService from '../services/githubService';

function Search() {
  const [searchCriteria, setSearchCriteria] = useState({
    username: '',
    location: '',
    minRepos: ''
  });
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchCriteria.username.trim() && !searchCriteria.location.trim()) return;

    setLoading(true);
    setError(false);
    setSearchResults(null);
    setCurrentPage(1);

    try {
      if (isAdvancedSearch) {
        const data = await githubService.advancedSearchUsers({
          ...searchCriteria,
          page: 1
        });
        setSearchResults(data);
      } else {
        const data = await githubService.fetchUserData(searchCriteria.username);
        setSearchResults({ items: [data], total_count: 1 });
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!searchResults || loading) return;

    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const data = await githubService.advancedSearchUsers({
        ...searchCriteria,
        page: nextPage
      });

      setSearchResults(prev => ({
        ...data,
        items: [...prev.items, ...data.items]
      }));
      setCurrentPage(nextPage);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Search GitHub Users</h2>
          <button
            type="button"
            onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
          >
            {isAdvancedSearch ? 'Simple Search' : 'Advanced Search'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={searchCriteria.username}
                onChange={handleInputChange}
                placeholder="Enter GitHub username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {isAdvancedSearch && (
              <>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={searchCriteria.location}
                    onChange={handleInputChange}
                    placeholder="e.g., San Francisco"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-1">
                    Min Repositories
                  </label>
                  <input
                    type="number"
                    id="minRepos"
                    name="minRepos"
                    value={searchCriteria.minRepos}
                    onChange={handleInputChange}
                    placeholder="e.g., 10"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {loading && !searchResults && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <p className="text-red-800">Looks like we cant find the user</p>
        </div>
      )}

      {searchResults && searchResults.items && searchResults.items.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              Search Results ({searchResults.total_count} total)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.items.map((user) => (
              <div key={user.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={user.avatar_url}
                    alt={`${user.login}'s avatar`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-semibold text-gray-900 truncate">
                      {user.name || user.login}
                    </h4>
                    <p className="text-sm text-gray-600">@{user.login}</p>
                  </div>
                </div>

                {user.bio && (
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{user.bio}</p>
                )}

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  {user.location && (
                    <span className="flex items-center">
                      📍 {user.location}
                    </span>
                  )}
                  {user.public_repos !== undefined && (
                    <span className="flex items-center">
                      📦 {user.public_repos} repos
                    </span>
                  )}
                </div>

                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
                >
                  View Profile
                </a>
              </div>
            ))}
          </div>

          {isAdvancedSearch && searchResults.items.length < searchResults.total_count && (
            <div className="text-center pt-6">
              <button
                onClick={loadMore}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      )}

      {searchResults && searchResults.items && searchResults.items.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No users found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

export default Search;