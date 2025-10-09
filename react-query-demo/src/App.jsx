import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import PostsComponent from './components/PostsComponent'
import PostDetail from './components/PostDetail'
import './App.css'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  const [currentView, setCurrentView] = useState('posts')
  const [selectedPostId, setSelectedPostId] = useState(null)

  const handlePostClick = (postId) => {
    setSelectedPostId(postId)
    setCurrentView('post-detail')
  }

  const handleBackToPosts = () => {
    setCurrentView('posts')
    setSelectedPostId(null)
  }

  const showCacheDemo = () => {
    setCurrentView('cache-demo')
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'posts':
        return <PostsComponent onPostClick={handlePostClick} />
      case 'post-detail':
        return <PostDetail postId={selectedPostId} onBack={handleBackToPosts} />
      case 'cache-demo':
        return (
          <div className="cache-demo">
            <h2>Cache Demonstration</h2>
            <p>Navigate between different views to see how React Query caches data:</p>
            <div className="demo-steps">
              <div className="step">
                <h3>Step 1: Load Posts</h3>
                <p>Click "Show Posts" to fetch data from the API</p>
                <button onClick={() => setCurrentView('posts')}>Show Posts</button>
              </div>
              <div className="step">
                <h3>Step 2: Hide Posts</h3>
                <p>Click "Hide Posts" to unmount the component</p>
                <button onClick={() => setCurrentView('hidden')}>Hide Posts</button>
              </div>
              <div className="step">
                <h3>Step 3: Show Posts Again</h3>
                <p>Notice how data loads instantly from cache!</p>
                <button onClick={() => setCurrentView('posts')}>Show Posts Again</button>
              </div>
            </div>
          </div>
        )
      case 'hidden':
        return (
          <div className="placeholder">
            <h2>Posts are hidden</h2>
            <p>The PostsComponent is unmounted, but data remains in React Query cache!</p>
            <p>Click "Show Posts" to see cached data load instantly.</p>
            <button onClick={() => setCurrentView('posts')} className="show-posts-btn">
              Show Posts (From Cache!)
            </button>
          </div>
        )
      default:
        return <PostsComponent onPostClick={handlePostClick} />
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <header>
          <h1>React Query Demo</h1>
          <p>Advanced Data Handling with React Query - Caching & Performance</p>
        </header>
        
        <nav className="navigation">
          <button 
            onClick={() => setCurrentView('posts')}
            className={currentView === 'posts' ? 'active' : ''}
          >
            📝 Posts List
          </button>
          <button 
            onClick={showCacheDemo}
            className={currentView === 'cache-demo' ? 'active' : ''}
          >
            🎯 Cache Demo
          </button>
          <button 
            onClick={() => setCurrentView('hidden')}
            className={currentView === 'hidden' ? 'active' : ''}
          >
            👁️ Hide Posts
          </button>
        </nav>

        <main>
          {renderCurrentView()}
        </main>

        {/* Cache Information Panel */}
        <div className="cache-info-panel">
          <h3>🔍 React Query Cache Information</h3>
          <p>
            <strong>Current View:</strong> {currentView} | 
            <strong> Active Queries:</strong> {queryClient.getQueryCache().getAll().length} | 
            <strong> Cache Size:</strong> {queryClient.getQueryCache().getAll().filter(query => query.state.data).length} queries with data
          </p>
          <small>Open React Query DevTools (bottom panel) to inspect cache in detail</small>
        </div>
      </div>
      
      {/* React Query Devtools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
