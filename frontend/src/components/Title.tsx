import React from "react"

function Title(props: {title: string, setTitle: (title: string) => void, children?: React.ReactNode}) {
    props.setTitle(props.title)
    return (
        <>
        {props.children}
        </>
    )
}

export default Title