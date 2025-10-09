import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

// API function to fetch posts
const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("Fetched posts from API:", data.length, "posts");
  return data;
};

const PostsComponent = ({ onPostClick }) => {
  const queryClient = useQueryClient();
  const [selectedPost, setSelectedPost] = useState(null);

  // Using React Query to fetch posts
  const {
    data: posts,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Cache for 10 minutes
    refetchOnWindowFocus: false, // Disable refetch on window focus
    keepPreviousData: true, // Keep previous data while fetching new data
  });

  // Handle manual refetch
  const handleRefetch = () => {
    refetch();
  };

  // Handle cache invalidation
  const handleInvalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  };

  // Clear cache completely
  const handleClearCache = () => {
    queryClient.removeQueries({ queryKey: ["posts"] });
  };

  // Get cache info
  const getCacheInfo = () => {
    const queryData = queryClient.getQueryData(["posts"]);
    const queryState = queryClient.getQueryState(["posts"]);

    return {
      hasCachedData: !!queryData,
      dataUpdatedAt: queryState?.dataUpdatedAt,
      fetchStatus: queryState?.fetchStatus,
      status: queryState?.status,
    };
  };

  const cacheInfo = getCacheInfo();

  if (isLoading) {
    return (
      <div className="posts-container">
        <div className="loading">
          <h2>Loading posts...</h2>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="posts-container">
        <div className="error">
          <h2>Error loading posts</h2>
          <p>{error.message}</p>
          <button onClick={handleRefetch} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-container">
      {/* Control Panel */}
      <div className="control-panel">
        <h2>React Query Controls</h2>
        <div className="controls">
          <button onClick={handleRefetch} disabled={isFetching}>
            {isFetching ? "Refetching..." : "Refetch Data"}
          </button>
          <button onClick={handleInvalidateCache}>Invalidate Cache</button>
          <button onClick={handleClearCache}>Clear Cache</button>
        </div>

        {/* Cache Status */}
        <div className="cache-status">
          <h3>Cache Status</h3>
          <div className="status-grid">
            <div>
              <strong>Has Cached Data:</strong>{" "}
              {cacheInfo.hasCachedData ? "✅ Yes" : "❌ No"}
            </div>
            <div>
              <strong>Status:</strong> {cacheInfo.status}
            </div>
            <div>
              <strong>Fetch Status:</strong> {cacheInfo.fetchStatus}
            </div>
            <div>
              <strong>Last Updated:</strong>{" "}
              {dataUpdatedAt
                ? new Date(dataUpdatedAt).toLocaleTimeString()
                : "Never"}
            </div>
            <div>
              <strong>Is Fetching:</strong> {isFetching ? "🔄 Yes" : "✅ No"}
            </div>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="posts-section">
        <h2>Posts ({posts?.length || 0})</h2>

        {selectedPost && (
          <div className="selected-post">
            <h3>Selected Post</h3>
            <div className="post-detail">
              <h4>{selectedPost.title}</h4>
              <p>{selectedPost.body}</p>
              <button onClick={() => setSelectedPost(null)}>Close</button>
            </div>
          </div>
        )}

        <div className="posts-grid">
          {posts?.slice(0, 10).map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.body.substring(0, 100)}...</p>
              <div className="post-meta">
                <span>ID: {post.id}</span>
                <span>User: {post.userId}</span>
              </div>
              <div className="post-actions">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="view-btn preview"
                >
                  Quick Preview
                </button>
                {onPostClick && (
                  <button
                    onClick={() => onPostClick(post.id)}
                    className="view-btn detail"
                  >
                    Full Detail
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {posts?.length > 10 && (
          <div className="load-more">
            <p>Showing first 10 of {posts.length} posts</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsComponent;
