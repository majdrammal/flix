import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Browse from './pages/Browse';
import Details from './pages/Details';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/browse/:title' element={<Browse />} />
            <Route path='/details/:type/:id' element={<Details />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
