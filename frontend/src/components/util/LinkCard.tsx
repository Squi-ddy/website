import { Link } from "react-router-dom"

function LinkCard(props: { title: string; link: string }) {
    return (
        <div className="w-10/12 rounded border transition-transform duration-500 hover:scale-[102.5%]">
            <Link
                to={props.link}
                className="flex flex-col items-center no-underline"
            >
                <section className="flex min-h-0 flex-col p-5">
                    <h2 className="text-2xl font-bold lg:text-3xl">
                        {props.title}
                    </h2>
                </section>
            </Link>
        </div>
    )
}

export default LinkCard
