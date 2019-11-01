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

export { readFile, saveFile }