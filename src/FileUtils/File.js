import fs from 'fs';
import path from 'path'

const readFile = (filename) => {
    return fs.readFileSync(filename, 'utf8')
}

const saveFile = (filename, fileContent) => {
    const ext = path.extname(filename)
    const customFileName = `${filename}${ext === '' ? '.txt' : ext}`

    fs.writeFileSync(path.join('src', 'Output', customFileName), fileContent.join('\n'))
}

const totalFilesInFolder = (folderPath) => {
    if(!folderPath){
        folderPath = path.resolve(__dirname, '../Output')
    }

    const result = fs.readdirSync(folderPath)

    return result ? result.length : 1
}

const getNewFileName = (folderPath ) => {
    return `source${totalFilesInFolder(folderPath) + 1}`
}
export { readFile, saveFile, getNewFileName }