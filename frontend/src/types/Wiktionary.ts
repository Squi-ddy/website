export default interface WiktionaryDef {
    word: string
    ipa: string[]
    meanings: Map<string, { context?: string; definition: string }[]>
}
