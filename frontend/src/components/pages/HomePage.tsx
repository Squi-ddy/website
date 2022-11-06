import LinkCard from "../util/LinkCard"
import Separator from "../util/Separator"

function HomePage() {
    return (
        <div className="flex flex-col items-center">
            <p className="text-xl italic">Hey! A website!</p>
            <div className="h-2 flex-none"></div>
            <Separator />
            <div className="h-2 flex-none"></div>
            <h2 className="text-2xl font-bold">Pages</h2>
            <div className="h-2 flex-none"></div>
            <ul className="flex w-full flex-col items-center">
                <LinkCard title="Daily LCS" link="/lcs" />
            </ul>
        </div>
    )
}

export default HomePage
