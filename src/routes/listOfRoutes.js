import React from "react"

const Dashboard = React.lazy(() => import("../pages/Dashboard"))
const FullScreen = React.lazy(() => import("../pages/Fullscreen"))

// const PageNotFound = React.lazy(() => import("../pages/404"))

export const routesList = {
    dashboard: "/",
    fullscreen: "/fullscreen"
}

const MainRouteList = [
    { path: routesList.dashboard, exact: true, element: Dashboard },
    { path: routesList.fullscreen, exact: true, element: FullScreen }
]
export default MainRouteList