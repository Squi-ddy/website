import { Link } from "react-router-dom"

function LinkCard(props: { title: string; link: string }) {
    return (
        <div className="border w-10/12 rounded hover:scale-[102.5%] transition-transform duration-500">
            <Link
                to={props.link}
                className="no-underline flex flex-col items-center"
            >
                <section className="p-5 min-h-0 flex flex-col">
                    <h2 className="text-2xl lg:text-3xl font-bold">
                        {props.title}
                    </h2>
                </section>
            </Link>
        </div>
    )
}

export default LinkCard
