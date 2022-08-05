import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Browse from './pages/Browse';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/browse/:title' element={<Browse />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
