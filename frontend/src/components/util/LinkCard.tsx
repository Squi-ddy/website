import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowForward } from "@mui/icons-material"
import { useState } from "react"

function LinkCard(props: { title: string; link: string }) {
    const [hover, setHover] = useState(false)

    return (<div className="w-10/12 rounded border hover:bg-violet-800 transition-all duration-500 hover:scale-[102.5%]"
                 onMouseEnter={() => {
                     setHover(true)
                 }}
                 onMouseLeave={() => {
                     setHover(false)
                 }}>
            <Link
                to={props.link}
                className="flex justify-center items-center gap-x-2 no-underline p-5"
            >
                <motion.h2 layout="position" className="text-3xl font-bold">
                    {props.title}
                </motion.h2>

                {hover && <AnimatePresence>
                    <motion.div
                        initial={{x: "-100%", opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        exit={{x: 50, opacity: 0}}
                    >
                        <ArrowForward className="mb-0.5"></ArrowForward>
                    </motion.div>
                </AnimatePresence>}
            </Link>
        </div>)
}

export default LinkCard
