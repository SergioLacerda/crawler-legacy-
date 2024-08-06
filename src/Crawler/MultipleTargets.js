import { saveFile, totalFilesInFolder } from '../FileUtils/File.js'
import { crawler } from './Crawler.js'
import { clear, removeSpecialChars } from './ClearLinks.js'

const readMultipleTargets = (inputFilePath, rawSources, tags) => {
    const promises = createPromises(rawSources, tags)

    return Promise.all(promises).then(rawTarget => { 
        let count = totalFilesInFolder()

        for(const target of rawTarget){
            count++
            saveFile(inputFilePath, count, clear(target, tags))
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

export { readMultipleTargets }