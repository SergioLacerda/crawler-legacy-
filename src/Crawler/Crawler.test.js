import { getExternalSite } from './ExternalRequest.js'
import { crawler } from './Crawler.js'
import { readFile } from '../FileUtils/File.js';

jest.mock('./ExternalRequest.js');

beforeEach(() => {
    getExternalSite.mockClear()
    getExternalSite.mockResolvedValue(['1', '2', '3', '4', '5'])
})

afterEach(() => {
    getExternalSite.mockClear()
})

test('validate mocks', async () => {
    const result = await crawler('http://www.fakeurl.com')

    expect(getExternalSite).toHaveBeenCalledTimes(1)

    expect(result).not.toBe(undefined)

    expect(result).toHaveLength(5)
})

test('Validate total of lines filterede by tag', async () => {
    const result = await crawler('http://www.fakeurl.com', '1')

    expect(getExternalSite).toHaveBeenCalledTimes(1)

    expect(result).not.toBe(undefined)

    expect(result).toHaveLength(1)

    expect(expect.arrayContaining(result)).toEqual(['1'])
})

test('Validate total of lines filtered by an array of tags', async () => {
    const result = await crawler('http://www.fakeurl.com', ['1' , '5'])

    expect(getExternalSite).toHaveBeenCalledTimes(1)

    expect(result).not.toBe(undefined)

    expect(result).toHaveLength(2)

    expect(expect.arrayContaining(result)).toEqual(['1', '5'])
})

test('Validate real stuff', async () => {
    const filehandle = readFile('./src/Crawler/Example/siteExample.txt')

    getExternalSite.mockResolvedValue(filehandle.split('\n'))

    const result = await crawler('http://www.ahnegao.com.br', ['<title>'])

    expect(getExternalSite).toHaveBeenCalledTimes(1)

    expect(result).not.toBe(undefined)

    expect(result).toHaveLength(2)

    expect(expect.arrayContaining(result)).toEqual(['<title>','<title>Ah Negão!</title>'])
})
