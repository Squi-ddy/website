import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import BasePage from "./components/misc/BasePage"
import { BrowserRouter } from "react-router-dom"

createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <BrowserRouter>
            <BasePage />
        </BrowserRouter>
    </StrictMode>
)
