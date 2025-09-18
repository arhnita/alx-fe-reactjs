import './App.css'
import Header from './components/Header'
import Search from './components/Search'

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <Search />
      </main>
    </div>
  )
}

export default App
