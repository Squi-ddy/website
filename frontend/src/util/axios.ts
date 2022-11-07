import axios, { AxiosError } from "axios"

function getAxios(baseUrl: string) {
    return axios.create({
        baseURL: baseUrl,
    })
}

const fetcher = getAxios("https://api.squiddy.me")

async function getAPI(link: string) {
    try {
        return await fetcher.get(link)
    } catch (err) {
        if (!(err instanceof AxiosError)) throw err
        if (err.response) {
            // server has no data, return undefined
            return undefined
        }
        // request didn't complete/weird error, return null
        return null
    }
}

export { getAxios, getAPI }
