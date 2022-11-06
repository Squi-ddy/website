import Separator from "../util/Separator"
import getCache from "../../util/cache"
import LCS from "../../types/LCS"
import getAPI from "../../util/api"
import { useEffect, useState } from "react"
import Spacer from "../util/Spacer"
import LCSDisplay from "../misc/LCSDisplay"

function LCSPage() {
    const lcsCache = getCache(async (lcsNum: number) => {
        const resp = await getAPI(`lcs/lcs/${lcsNum}`)
        return resp?.data as LCS
    })

    const [lcs, setLcs]: [LCS | undefined | null, (val: LCS | undefined | null) => void] = useState(null)

    useEffect(() => {
        async function getLatestLCS(): Promise<void> {
            const resp = await getAPI(`lcs/lcs`)
            if (resp === undefined) {
                console.log("sus")
                setLcs(undefined)
                return undefined
            }
            const lcs = resp.data as LCS
            lcsCache.set(lcs.id, lcs)
            setLcs(lcs)
        }

        getLatestLCS().then(r => r)
    }, [])

    const failed = (<><p className="text-xl italic">No data :(</p></>)
    const page = (<>
        <p className="text-4xl font-bold">Daily LCS #{lcs?.id}</p>
        <p className="text-l italic">{lcs?.day}</p>
        <Spacer h={2} />
        <Separator />
        <Spacer h={5} />
        <LCSDisplay isSus={false} lcs={lcs} />
    </>)

    return (
        <div className="flex flex-col items-center">
            {
                lcs !== null &&
                (lcs === undefined
                ? failed
                : page)
            }
        </div>
    )
}

export default LCSPage
