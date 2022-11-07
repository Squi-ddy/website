import { useEffect, useState } from "react"
import LCSClean from "../../types/LCSClean"
import { AnimatePresence, motion } from "framer-motion"

function LCSDisplay(props: {
    isSus: boolean
    lcs: LCSClean
    meanings: (object | undefined)[]
}) {
    const [words, setWords] = useState([
        props.lcs.words[0],
        props.lcs.words[1],
        props.isSus ? props.lcs.words[3] : props.lcs.words[2],
    ])

    useEffect(() => {
        setWords([
            props.lcs.words[0],
            props.lcs.words[1],
            props.isSus ? props.lcs.words[3] : props.lcs.words[2],
        ])
    }, [props.isSus, props.lcs])

    const [isOpen, setIsOpen] = useState(new Array(4).fill(false) as boolean[])

    return (
        <div id="lcs" className="flex flex-col items-center">
            {words.map((word: string, i: number) => {
                return (
                    <>
                        <p
                            key={word}
                            className="my-1 cursor-pointer text-3xl font-bold italic transition-all hover:scale-[102.5%] hover:text-cyan-500"
                            onClick={() => {
                                const isOpenCopy = [...isOpen]
                                isOpenCopy[i] = !isOpenCopy[i]
                                setIsOpen(isOpenCopy)
                            }}
                        >
                            {word}
                        </p>

                        <AnimatePresence>
                            {isOpen[i] && (
                                <motion.p
                                    initial={{ y: "-50%", opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: "-50%", opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    key={word}
                                >
                                    {String(props.meanings[i])}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </>
                )
            })}
        </div>
    )
}

export default LCSDisplay
