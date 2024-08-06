import axios from 'axios'
import fs from 'fs'
import { generateDefaultOutputFilePath } from '../FileUtils/File.js'

const downloadFile = (link, fileName, fileNumber) => {
  let file = fs.createWriteStream(generateDefaultOutputFilePath(fileName, fileNumber, 'mp4'))

  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: link,
      responseType: 'stream',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xmlq=0.9,image/webp,image/apng,*/*q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,enq=0.9,frq=0.8,roq=0.7,ruq=0.6,laq=0.5,ptq=0.4,deq=0.3',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
      },
      gzip: true
    })
    .then(response => {
      response.data.pipe(file)
      file.on('finish', () => {
        console.log(`Completed download for File: ${fileName}${fileNumber}`)
        resolve()
      })
      file.on('error', (error) => {
        reject(error)
      })
    })
    .catch(error => {
      reject(error)
    })
  })
  .catch(error => {
    console.log(`Something happened: ${error}`)
    return Promise.reject(error)
  })
}

const startParalelDownloads = async (rawLinks, fileName) => {
  const promises = []
  let count = 1
  for (const link of rawLinks) {
    promises.push(downloadFile(link, fileName, count))
    count++
  }

  await Promise.all(promises)
}

const startCadencedDownloads = async (rawLinks, fileName) => {
  let count = 1
  for (const link of rawLinks) {
    await downloadFile(link, fileName, count)
    count++
  }
}

export { startCadencedDownloads, startParalelDownloads }
