import React, { Suspense, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import MainRoutes from './routes/MainRoutes';
import DefaultLoader from './components/loaders/DefaultLoader';
import Login from './pages/Login';
import './App.css';
import Navbar from './components/global/Navbar';
import { useSelector } from 'react-redux';


const AllRoutes = () => {
  const [visibleBottom, setVisibleBottom] = useState(false);
  // const [format, setFormat] = useState('seconds')
  const ste=useSelector(state=>state.format)
  console.log(ste)
  return (
    <Router>
      <Navbar
        visibleBottom={visibleBottom}
        setVisibleBottom={setVisibleBottom}
      />
      <Suspense fallback={<DefaultLoader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<MainRoutes />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default AllRoutes