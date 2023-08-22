import React, { Suspense } from 'react'
import ListOfRoutes from './listOfRoutes'
import { Routes, Route } from 'react-router-dom'
import DefaultLoader from '../components/loaders/DefaultLoader'
import { useSelector } from 'react-redux'
import { isTokenExpired } from '../tools'

const MainLayout = () => {
  const { accessToken } = useSelector((state) => state.global)
  console.log(accessToken)
  const PageNotFound = () => {
    return (
      <div
        className="bg-[#1a1a1a] text-[#fff] text-center flex flex-col items-center justify-center m-0"
        style={{ height: '100vh' }}
      >
        <h1 className="text-4xl">404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <p>
          <a href="/">Return to Home</a>
        </p>
      </div>
    )
  }
  return (
    <React.Fragment>
      {
        <main>
          <Suspense fallback={<DefaultLoader />}>
            <Routes>
              {ListOfRoutes.map((route, index) => {
                return accessToken != null && !isTokenExpired(accessToken) ? (
                  <Route
                    key={index}
                    path={route.path}
                    element={<route.element />}
                  />
                ) : (
                  <Route
                    key={index}
                    path={route.path}
                    element={<PageNotFound />}
                  />
                )
              })}
            </Routes>
          </Suspense>
        </main>
      }
    </React.Fragment>
  )
}

export default MainLayout
