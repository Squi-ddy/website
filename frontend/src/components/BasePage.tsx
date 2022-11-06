import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import WebsiteRouter from "../router/WebsiteRouter"

function BasePage() {
    const [title, setTitle] = useState("")

    useEffect(() => {
        document.title = title
    }, [title])

    return (
        <div>
            <div
                id="header"
                className="grid grid-flow-row grid-cols-3 items-center justify-items-center p-2 bg-gradient-to-r from-cyan-800 to-cyan-900 h-12 mb-2"
            >
                <motion.a
                    href="https://github.com/squi-ddy"
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full col-start-1 justify-self-start"
                >
                    <img
                        src="./src/assets/avatar.png"
                        alt="icon"
                        className="h-full"
                    />
                </motion.a>
                <motion.h1
                    className="text-2xl font-bold col-start-2"
                    key={title}
                    initial={{ y: "-100%", opacity: 1 }}
                    animate={{ y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {title}
                </motion.h1>
            </div>

            <WebsiteRouter setTitle={setTitle} />
        </div>
    )
}

export default BasePage
