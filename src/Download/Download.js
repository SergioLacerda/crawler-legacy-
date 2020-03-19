import request  from 'request'
import fs from 'fs'
import { generateDefaultOutputFilePath } from '../FileUtils/File'

const downloadFile = (link, fileName, fileNumber) => {
    let file = fs.createWriteStream(generateDefaultOutputFilePath(fileName, fileNumber, 'mp4'));
  
    return new Promise((resolve, reject) => {
        request({
            uri: link,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
                'Cache-Control': 'max-age=0',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
            },
            gzip: true
        })
        .pipe(file)
        .on('finish', () => {
            console.log(`Completed download for File: ${fileName}${fileNumber}`)

            return resolve();
        })
        .on('error', (error) => {
            return reject(error)
        })
    })
    .catch(error => {
        console.log(`Something happened: ${error}`)
        return Promise.error()
    });
}

const startParalelDownloads = async (rawLinks, fileName) =>{
    const promises = []
    let count = 1
    for(const link of rawLinks){
        promises.push(downloadFile(link, fileName, count))
        count++
    }

    await Promise.all(promises)
}

const startCadencedDownloads = async (rawLinks, fileName) =>{
    let count = 1
    for(const link of rawLinks){
        await downloadFile(link, fileName, count)
        count++
    }
}

export { startCadencedDownloads, startParalelDownloads }