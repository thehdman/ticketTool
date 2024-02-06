import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Navbar } from 'react-bootstrap';

function App() {
  return (
    <AppRoutes></AppRoutes>
  );
}

export default App;
