import React from "react"

const Dashboard = React.lazy(() => import("../pages/Dashboard"))
const FullScreen = React.lazy(() => import("../pages/Fullscreen"))
const FullscreenPlus = React.lazy(() => import("../pages/FullscreenPlus"))
// const PageNotFound = React.lazy(() => import("../pages/404"))

export const routesList = {
    dashboard: "/",
    fullscreen: "/fullscreen",
    fullscreenplus: "/fullscreenplus"
}

const MainRouteList = [
    { path: routesList.dashboard, exact: true, element: Dashboard },
    { path: routesList.fullscreen, exact: true, element: FullScreen },
    { path: routesList.fullscreenplus, exact: true, element: FullscreenPlus }
]
export default MainRouteList