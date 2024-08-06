import fs from 'fs'
import path from 'path'

const readFile = (fileName) => {
    return fs.readFileSync(fileName, 'utf8')
}

const getOutputPath = () => { 
    return path.join(path.resolve(__dirname, '../../Output'))
}

const generateDefaultOutputFilePath = (fileName, fileNumber, fileExtension) => {
    const rawFileName = path.parse(fileName)
    const inputFileName = rawFileName.name
    const outputFileName = `${inputFileName}${fileNumber ? fileNumber : ''}.${fileExtension}`

    return path.join(getOutputPath(), outputFileName)
}

const saveFile = (inputFilePath, fileNumber, fileContent) => {
    const fileNameWithPath = generateDefaultOutputFilePath(inputFilePath, fileNumber, 'txt')

    fs.writeFileSync(fileNameWithPath, fileContent.join('\n'))
}

const totalFilesInFolder = (folderPath = getOutputPath()) => {
    const result = fs.readdirSync(folderPath)

    return result ? result.length : 1
}

export { readFile, saveFile, totalFilesInFolder, generateDefaultOutputFilePath }