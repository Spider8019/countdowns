import React from 'react'

const Dashboard = React.lazy(() => import('../pages/Dashboard'))
const FullScreen = React.lazy(() => import('../pages/Fullscreen'))
const FullscreenPlus = React.lazy(() => import('../pages/FullscreenPlus'))
const Profile = React.lazy(() => import('../pages/Profile'))
// const PageNotFound = React.lazy(() => import("../pages/404"))

export const routesList = {
  dashboard: '/',
  fullscreen: '/fullscreen',
  fullscreenplus: '/fullscreenplus',
  profile: '/profile',
}

const MainRouteList = [
  { path: routesList.dashboard, exact: true, element: Dashboard },
  { path: routesList.fullscreen, exact: true, element: FullScreen },
  { path: routesList.fullscreenplus, exact: true, element: FullscreenPlus },
  { path: routesList.profile, exact: true, element: Profile },
]
export default MainRouteList
