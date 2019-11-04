import { readFile, saveFile, getNewFileName } from '../FileUtils/File.js';
import { crawler } from './Crawler.js'
import { clear, removeSpecialChars } from './ClearLinks.js'

const readMultipleSouces = (rawSources, tags) => {
    const promises = createPromises(rawSources, tags)

    Promise.all(promises).then(source => { 
        const result = []
        for(const s of source){
            result.push(...s)
        }

        saveFile(`source${getNewFileName()}`, clear(result, tags))
    })
}

const createPromises = (sources, tags) => {
    const promises = []

    for (const target of sources){
        const clearedLink = removeSpecialChars(target)
        promises.push(crawler(clearedLink, tags))
    }

    return promises
}

export { readMultipleSouces }