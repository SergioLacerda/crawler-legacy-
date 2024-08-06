import { readFile, saveFile, totalFilesInFolder, generateDefaultOutputFilePath } from '../FileUtils/File'
import fs from 'fs'
import path from 'path'
import { jest } from '@jest/globals'

jest.mock('fs')

describe('File Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('readFile', () => {
    it('should read a file and return its content', () => {
      const fileName = 'test.txt'
      const fileContent = 'This is a test file.'
      fs.readFileSync.mockReturnValue(fileContent)

      const result = readFile(fileName)

      expect(result).toBe(fileContent)
      expect(fs.readFileSync).toHaveBeenCalledWith(fileName, 'utf8')
    })
  })

  describe('generateDefaultOutputFilePath', () => {
    it('should generate the correct output file path with file number', () => {
      const fileName = 'test.mp4'
      const fileNumber = 2
      const fileExtension = 'mp4'
      const expectedPath = path.join(path.resolve(__dirname, '../../Output'), 'test2.mp4')

      const result = generateDefaultOutputFilePath(fileName, fileNumber, fileExtension)

      expect(result).toBe(expectedPath)
    })

    it('should generate the correct output file path without file number', () => {
      const fileName = 'test.mp4'
      const fileExtension = 'mp4'
      const expectedPath = path.join(path.resolve(__dirname, '../../Output'), 'test.mp4')

      const result = generateDefaultOutputFilePath(fileName, null, fileExtension)

      expect(result).toBe(expectedPath)
    })

    it('should generate the correct output file path if rawFileName is null', () => {
      const fileName = 'test'
      const fileNumber = 2
      const fileExtension = 'mp4'
      const expectedPath = path.join(path.resolve(__dirname, '../../Output'), 'test2.mp4')

      const result = generateDefaultOutputFilePath(fileName, fileNumber, fileExtension)

      expect(result).toBe(expectedPath)
    })

    it('should generate the correct output file path if rawFileName is an empty string', () => {
      const fileName = ''
      const fileNumber = 2
      const fileExtension = 'mp4'
      const expectedPath = path.join(path.resolve(__dirname, '../../Output'), '2.mp4')

      const result = generateDefaultOutputFilePath(fileName, fileNumber, fileExtension)

      expect(result).toBe(expectedPath)
    })
  })

  describe('saveFile', () => {
    it('should save the file content to the correct path', () => {
      const inputFilePath = 'test.txt'
      const fileNumber = 1
      const fileContent = ['This is a test file.']
      const expectedPath = path.join(path.resolve(__dirname, '../../Output'), 'test1.txt')

      saveFile(inputFilePath, fileNumber, fileContent)

      expect(fs.writeFileSync).toHaveBeenCalledWith(expectedPath, 'This is a test file.')
    })
  })

  describe('totalFilesInFolder', () => {
    it('should return the total number of files in the output folder', () => {
      const folderPath = path.join(path.resolve(__dirname, '../../Output'))
      const files = ['file1.txt', 'file2.txt']
      fs.readdirSync.mockReturnValue(files)

      const result = totalFilesInFolder(folderPath)

      expect(result).toBe(2)
      expect(fs.readdirSync).toHaveBeenCalledWith(folderPath)
    })

    it('should return 0 if the folder is empty', () => {
        const folderPath = path.join(path.resolve(__dirname, '../../Output'))
        fs.readdirSync.mockReturnValue([])
  
        const result = totalFilesInFolder(folderPath)
  
        expect(result).toBe(0)
        expect(fs.readdirSync).toHaveBeenCalledWith(folderPath)
      })

    it('should return the total number of files in the output folder using default parameter', () => {
        const folderPath = path.join(path.resolve(__dirname, '../../Output'))
        const files = ['file1.txt', 'file2.txt']
        fs.readdirSync.mockReturnValue(files)
  
        const result = totalFilesInFolder()
  
        expect(result).toBe(2)
        expect(fs.readdirSync).toHaveBeenCalledWith(folderPath)
      })

    it('should return 1 if result is null', () => {
      const folderPath = path.join(path.resolve(__dirname, '../../Output'))
      fs.readdirSync.mockReturnValue(null)

      const result = totalFilesInFolder(folderPath)

      expect(result).toBe(1)
      expect(fs.readdirSync).toHaveBeenCalledWith(folderPath)
    })
  })
})
