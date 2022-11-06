import React from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import BasePage from "./components/BasePage"


createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BasePage />
    </React.StrictMode>
)
