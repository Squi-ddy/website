import axios from "axios"

const fetcher = axios.create({
    baseURL: "https://api.squiddy.me"
})

async function getAPI(link: string) {
    try {
        return await fetcher.get(link)
    } catch (err) {
        return undefined
    }
}

export default getAPI