import LCS from "../../types/LCS"

function LCSDisplay(props: {isSus: boolean, lcs: LCS}) {
    return (
        <>
        <a className="text-3xl font-bold italic my-1 hover:text-cyan-500 hover:scale-[102.5%] transition-all">{props.lcs.l.word}</a>
        <a className="text-3xl font-bold italic my-1 hover:text-cyan-500 hover:scale-[102.5%] transition-all">{props.lcs.c.word}</a>
        <a className="text-3xl font-bold italic my-1 hover:text-cyan-500 hover:scale-[102.5%] transition-all">{props.isSus
            ?props.lcs.sus.word
            :props.lcs.s.word}</a>
        </>
    )
}

export default LCSDisplay