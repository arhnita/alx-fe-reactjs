import { useQuery } from "@tanstack/react-query";

// API function to fetch a single post
const fetchPost = async (postId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log(`Fetched post ${postId} from API`);
  return data;
};

const PostDetail = ({ postId, onBack }) => {
  const {
    data: post,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!postId, // Only run query if postId exists
  });

  if (isLoading) {
    return (
      <div className="post-detail-container">
        <button onClick={onBack} className="back-btn">
          ← Back to Posts
        </button>
        <div className="loading">
          <h3>Loading post details...</h3>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="post-detail-container">
        <button onClick={onBack} className="back-btn">
          ← Back to Posts
        </button>
        <div className="error">
          <h3>Error loading post</h3>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      <div className="post-detail-header">
        <button onClick={onBack} className="back-btn">
          ← Back to Posts
        </button>
        {isFetching && (
          <span className="fetching-indicator">🔄 Refreshing...</span>
        )}
      </div>

      <article className="full-post">
        <header>
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span>Post ID: {post.id}</span>
            <span>User ID: {post.userId}</span>
          </div>
        </header>

        <div className="post-content">
          <p>{post.body}</p>
        </div>

        <footer className="post-footer">
          <small>
            This post was{" "}
            {isFetching ? "just refreshed" : "loaded from cache or fresh fetch"}
          </small>
        </footer>
      </article>
    </div>
  );
};

export default PostDetail;
