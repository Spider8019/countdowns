import React, { Suspense, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainRoutes from './routes/MainRoutes'
import DefaultLoader from './components/loaders/DefaultLoader'
import Login from './pages/Login'
import './App.css'
import Navbar from './components/global/Navbar'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch } from 'react-redux'
import { setAccessToken } from './redux/slices/global'

const AllRoutes = () => {
  const [visibleBottom, setVisibleBottom] = useState(false)
  const { getAccessTokenSilently } = useAuth0()
  const dispatch = useDispatch()

  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently()
        // dispatch(setAccessToken({ accessToken }))
        console.log(accessToken,"ooi maa")
      } catch (error) {
        // Handle error
        console.log(error)
      }
    }

    getToken()
  }, [dispatch, getAccessTokenSilently])
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
