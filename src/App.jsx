import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import  Home  from './Home';
import  Upload  from './Upload';
  

export default function MainApp() {
  return (
    <>
    <Link to="/">Home</Link>
    <Link to="/upload">Upload</Link>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
    </Routes>
    </>
  );
}
