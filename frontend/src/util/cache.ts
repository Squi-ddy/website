import LRU from "lru-cache"

const options = {
    max: 500
}

function getCache<K, V>(fetchMethod: (key: K, oldValue?: V) => Promise<V | undefined>): LRU<K, V> {
    return new LRU({...options, fetchMethod: fetchMethod})
}

export default getCache