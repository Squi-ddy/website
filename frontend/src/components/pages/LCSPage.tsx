import LinkCard from "../util/LinkCard"
import Separator from "../util/Separator"
import getCache from "../../util/cache"
import LCS from "../../types/LCS"
import getAPI from "../../util/api"
import { useEffect, useState } from "react"

function LCSPage() {
    const lcsCache = getCache(async (lcsNum: number) => {
        const resp = await getAPI(`lcs/lcs/${lcsNum}`)
        return resp?.data as LCS
    })

    const [LCSNum, setLCSNum]: [number | undefined, (val: number | undefined) => void] = useState(undefined)

    useEffect(() => {
        async function getLatestLCS(): Promise<void> {
            const resp = await getAPI(`lcs/lcs`)
            if (resp === undefined) {
                return undefined
            }
            const lcs = resp.data as LCS
            lcsCache.set(lcs.id, lcs)
            setLCSNum(lcs.id)
        }

        getLatestLCS().then(r => r)
    })

    const failed = (<><div className="h-5 flex-none"></div><p className="text-xl italic">No data :(</p></>)
    const page = (<>
        <p className="text-xl italic">Daily LCS</p>
        <div className="h-2 flex-none"></div>
        <Separator />
        <div className="h-2 flex-none"></div>
        <h2 className="text-2xl font-bold">Pages</h2>
        <div className="h-2 flex-none"></div>
        <ul className="flex w-full flex-col items-center">
            <LinkCard title="Daily LCS" link="/lcs" />
        </ul>
    </>)

    return (
        <div className="flex flex-col items-center">
            {
                LCSNum === undefined
                ? failed
                : page
            }
        </div>
    )
}

export default LCSPage
