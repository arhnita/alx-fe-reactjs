# React Query Demo - Advanced Data Handling

This project demonstrates advanced data fetching and management in a React application using **@tanstack/react-query** (formerly React Query), focusing on efficient API interactions and improved user interface responsiveness.

## 🎯 Project Overview

The application showcases React Query's capabilities for:

- **Data Fetching**: Efficient API calls with automatic loading states
- **Caching**: Smart data caching with stale-while-revalidate strategy
- **Background Updates**: Automatic data refetching and synchronization
- **Error Handling**: Robust error management and retry logic
- **Performance Optimization**: Reduced network requests through intelligent caching

## 🚀 Features Implemented

### ✅ Core React Query Integration

- QueryClient setup with optimized default configurations
- QueryClientProvider wrapping the entire application
- React Query DevTools for debugging and cache inspection

### ✅ Advanced Data Fetching

- **PostsComponent**: Fetches posts from JSONPlaceholder API
- **PostDetail**: Individual post fetching with route-based caching
- Loading states, error handling, and retry mechanisms
- Background refetching indicators

### ✅ Caching Demonstrations

- **Cache Persistence**: Data remains cached when components unmount
- **Instant Loading**: Cached data loads immediately on component remount
- **Stale-While-Revalidate**: Fresh data fetched in background while showing cached data
- **Cache Invalidation**: Manual cache clearing and data refetching

### ✅ Interactive Controls

- Manual refetch buttons
- Cache invalidation controls
- Cache clearing functionality
- Real-time cache status monitoring

### ✅ Navigation System

- Multiple views to demonstrate caching behavior
- Component mounting/unmounting to show cache persistence
- Detailed post view with individual caching

## 🛠️ Technical Implementation

### API Integration

```javascript
// Using JSONPlaceholder API
const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};
```

### React Query Configuration

```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});
```

### Hook Usage

```javascript
const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
  queryKey: ["posts"],
  queryFn: fetchPosts,
  staleTime: 5 * 60 * 1000,
  cacheTime: 10 * 60 * 1000,
});
```

## 📦 Dependencies

- **@tanstack/react-query**: Core React Query library
- **@tanstack/react-query-devtools**: Development tools for debugging
- **React 19**: Latest React version
- **Vite**: Fast build tool and development server

## 🚀 Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🧪 Testing React Query Features

### 1. Data Fetching Test

- Load the app and observe the loading state
- Check network tab in DevTools for API calls
- Notice how data renders after successful fetch

### 2. Caching Behavior Test

- Click "Hide Posts" to unmount the PostsComponent
- Click "Show Posts" to remount - data loads instantly from cache
- Check network tab - no new API call made

### 3. Background Refetching Test

- Use "Refetch Data" button to trigger manual refetch
- Observe the "Is Fetching" indicator
- Data updates after successful background fetch

### 4. Cache Invalidation Test

- Click "Invalidate Cache" to mark cache as stale
- Notice data refetches automatically
- Use "Clear Cache" to completely remove cached data

### 5. Individual Post Caching Test

- Click "Full Detail" on any post
- Navigate back and forth - individual posts are cached separately
- Check React Query DevTools to see separate cache entries

## 🔍 React Query DevTools

The project includes React Query DevTools for detailed cache inspection:

- **Query Cache**: View all cached queries and their states
- **Mutations**: Monitor data updates and mutations
- **Network Status**: Track loading and error states
- **Cache Timeline**: See when data was fetched and updated

## 📊 Performance Benefits Demonstrated

1. **Reduced Network Requests**: Cached data eliminates redundant API calls
2. **Faster User Experience**: Instant loading from cache
3. **Background Updates**: Fresh data without blocking UI
4. **Automatic Retries**: Failed requests retry automatically
5. **Memory Management**: Automatic cache cleanup after expiration

## 🎯 Key Learning Outcomes

- Understanding React Query's caching strategy
- Implementing efficient data fetching patterns
- Managing loading and error states effectively
- Optimizing application performance through smart caching
- Using React Query DevTools for debugging

## 🌐 API Used

**JSONPlaceholder**: Free fake REST API for testing and prototyping

- **Posts Endpoint**: `https://jsonplaceholder.typicode.com/posts`
- **Individual Post**: `https://jsonplaceholder.typicode.com/posts/{id}`

## 📁 Project Structure

```
src/
├── components/
│   ├── PostsComponent.jsx    # Main posts list with React Query
│   └── PostDetail.jsx        # Individual post detail view
├── App.jsx                   # Main app with QueryClient setup
├── App.css                   # Comprehensive styling
└── main.jsx                  # Application entry point
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎉 Success Criteria Met

✅ React Query successfully integrated  
✅ Data fetching with loading states implemented  
✅ Error handling and retry logic working  
✅ Caching behavior clearly demonstrated  
✅ Background refetching functional  
✅ Cache invalidation and clearing working  
✅ React Query DevTools integrated  
✅ Performance optimizations visible  
✅ User interface responsive and intuitive

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
