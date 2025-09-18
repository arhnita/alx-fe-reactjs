import { useState } from 'react';
import githubService from '../services/githubService';

function Search() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(false);
    setUserData(null);

    try {
      const data = await githubService.fetchUserData(username);
      setUserData(data);
    } catch (err) {
      console.error(err)
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <p className="loading-message">Loading...</p>}

      {error && <p className="error-message">Looks like we cant find the user</p>}

      {userData && !loading && !error && (
        <div className="user-info">
          <img
            src={userData.avatar_url}
            alt={`${userData.login}'s avatar`}
            className="user-avatar"
          />
          <h3>{userData.name || userData.login}</h3>
          <p>@{userData.login}</p>
          {userData.bio && <p className="user-bio">{userData.bio}</p>}
          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="profile-link"
          >
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default Search;