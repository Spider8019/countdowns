import React, { Suspense, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import MainRoutes from './routes/MainRoutes';
import DefaultLoader from './components/loaders/DefaultLoader';
import Login from './pages/Login';
import './App.css';
import Navbar from './components/global/Navbar';

const AllRoutes = () => {
  const [visibleBottom, setVisibleBottom] = useState(false);
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