import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Browse from './pages/Browse';
import Details from './pages/Details';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path=':title' element={<Browse />} />
            <Route path='/details' element={<Details />} />
        </Routes>
        <Register />
        <Login />
      </div>
    </Router>
  );
}

export default App;
