import React, { Suspense } from 'react'
import ListOfRoutes from "./listOfRoutes"
import { Routes, Route } from 'react-router-dom'
import DefaultLoader from "../components/loaders/DefaultLoader"

const MainLayout = () => {

    return (
        <React.Fragment>
            {
                <main>
                    <Suspense fallback={<DefaultLoader />}>
                        <Routes>
                            {ListOfRoutes.map((route, index) => {
                                return (

                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={<route.element />}
                                    />
                                    // :
                                    // <Route
                                    //     key={index}
                                    //     path={route.path}
                                    //     element={<PageNotFound />}
                                    // />
                                )
                            })}
                        </Routes>
                    </Suspense>
                </main>
            }
        </React.Fragment >
    )
}

export default MainLayout