import { getAxios } from "./axios"
import WiktionaryDef from "../types/Wiktionary"

const wiktionaryFetcher = getAxios("https://en.wiktionary.org/w/api.php")

const speech = [
    "Noun",
    "Pronoun",
    "Adjectives",
    "Numerals",
    "Verb",
    "Adverb",
    "Article",
    "Preposition",
    "Conjunction",
    "Interjection",
    "Abbreviation",
]

const matchNewline = /\n/g
const getEnglishSection = /==English==(.*?)((==[\p{L} ]+==\\n)|$)/u
const getIPA = /\{\{IPA\|en\|\/(.+?)\/\}\}/gsu
const getDefinitionBlock = /=+(\w+)=+\\n(.+?)(?===)/gsu
const getListBullets = /# (.+?)\\n/gsu
const replaceSquareBrackets = /\[\[(.+?)\]\]/gsu
const getContext = /^\{\{lb\|en\|(.+?)\}\} (.+?)$/su
const replaceSpace = /\|_\|/g
const unescape = /\\(.)/gsu

async function getWiktionaryDef(
    word: string
): Promise<WiktionaryDef | undefined> {
    try {
        const data = await wiktionaryFetcher.get("", {
            params: {
                action: "parse",
                page: word,
                prop: "wikitext",
                formatversion: "2",
                format: "json",
                origin: "*",
            },
        })

        const rawWikitext = (
            data.data as { parse: { wikitext: string } }
        ).parse.wikitext.replace(matchNewline, "\\n")

        console.log(rawWikitext)

        const englishContent: string | undefined = rawWikitext
            ?.match(getEnglishSection)
            ?.at(1)
        if (englishContent === undefined) return undefined

        const returnWord = {
            word: word,
            ipa: [],
            meanings: new Map(),
        } as WiktionaryDef

        for (const match of englishContent.matchAll(getIPA)) {
            returnWord.ipa.push(match[1])
        }

        for (const matchGroup of englishContent.matchAll(getDefinitionBlock)) {
            const partOfSpeech = matchGroup[1]
            if (!speech.includes(partOfSpeech)) continue

            let block: string = matchGroup[2]

            block = block.replaceAll(replaceSquareBrackets, (...args) => {
                const metadata = (args[1] as string).split("|")
                if (metadata.length > 2) return ""
                return metadata[metadata.length - 1]
            })

            console.log(partOfSpeech)

            let definitionList = returnWord.meanings.get(partOfSpeech)

            if (!definitionList) {
                definitionList = []
            }

            for (const definitionGroup of block.matchAll(getListBullets)) {
                let definition = definitionGroup[1]

                console.log(definition)

                const contextBlock = definition.match(getContext)

                console.log(contextBlock)
                if (contextBlock === null) {
                    if (!definition.endsWith(".")) {
                        definition = definition + "."
                    }
                    definitionList.push({ definition })
                } else {
                    let context = contextBlock[1]
                    definition = contextBlock[2]
                    if (!definition.endsWith(".")) {
                        definition = definition + "."
                    }

                    context = context
                        .replaceAll(replaceSpace, " ")
                        .replaceAll(unescape, "$1")
                        .split("|")
                        .join(", ")
                    definitionList.push({ context, definition })
                }
            }

            console.log(definitionList)
            returnWord.meanings.set(partOfSpeech, definitionList)
        }

        return returnWord
    } catch (e) {
        return undefined
    }
}

export { getWiktionaryDef }
