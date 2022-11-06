import { createBrowserRouter } from "react-router-dom"
import Title from "../components/Title"
import HomePage from "../components/HomePage"

function getRouter(setTitle: (title: string) => void) {
    return createBrowserRouter([{
        path: "/", element: (<Title title="Homepage" setTitle={setTitle}>
            <HomePage />
        </Title>)
    }, {
        path: "/lcs", element: <Title title="Daily LCS" setTitle={setTitle} ><p>hi</p></Title>
    }])
}

export default getRouter