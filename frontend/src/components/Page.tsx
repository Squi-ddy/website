import React from "react"
import { motion } from "framer-motion"

function Page(props: {
    title: string
    setTitle: (title: string) => void
    children?: React.ReactNode
}) {
    props.setTitle(props.title)
    return (
        <motion.div
            id="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {props.children}
        </motion.div>
    )
}

export default Page
