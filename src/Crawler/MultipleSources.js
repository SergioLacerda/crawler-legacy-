import { saveFile, getNewFileName } from '../FileUtils/File.js';
import { crawler } from './Crawler.js'
import { clear, removeSpecialChars } from './ClearLinks.js'

const readMultipleSouces = (rawSources, tags) => {
    const promises = createPromises(rawSources, tags)

    return Promise.all(promises).then(sources => { 
        for(const target of sources){
            saveFile(getNewFileName(), clear(target, tags))
        }
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