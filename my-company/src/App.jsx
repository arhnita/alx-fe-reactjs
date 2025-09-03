import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';

function App() {


  return (
    <>
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path='/'>{<Home />}</Route>
          <Route path='/about'>{<About />}</Route>
          <Route path='/services'>{<Services />}</Route>
          <Route path='/contact'>{<Contact />}</Route>
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
