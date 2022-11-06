import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { RouterProvider } from "react-router-dom"
import getRouter from "../router/router"

function BasePage() {
    const [title, setTitle] = useState("")

    useEffect(() => {
        document.title = title
    }, [title])

    const router = getRouter(setTitle)

    return (
        <div>
            <div
                id="header"
                className="grid grid-flow-row grid-cols-3 items-center justify-items-center p-2 bg-gradient-to-r from-cyan-800 to-cyan-900 h-12 mb-2"
            >
                <a
                    href="https://github.com/squi-ddy"
                    className="h-full col-start-1 justify-self-start"
                >
                    <img
                        src="./src/assets/avatar.png"
                        alt="icon"
                        className="h-full"
                    />
                </a>
                <AnimatePresence>
                    <motion.h1
                        className="text-2xl font-bold col-start-2"
                        initial={{ y: -50, opacity: 1 }}
                        animate={{ y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {title}
                    </motion.h1>
                </AnimatePresence>
            </div>

            <AnimatePresence>
                <motion.main
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <RouterProvider router={router} />
                </motion.main>
            </AnimatePresence>
        </div>
    )
}

export default BasePage
