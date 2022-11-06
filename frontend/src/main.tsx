import React from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import BasePage from "./components/misc/BasePage"
import { BrowserRouter } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <AnimatePresence mode="wait">
                <BasePage />
            </AnimatePresence>
        </BrowserRouter>
    </React.StrictMode>
)
