import { getExternalSite } from './ExternalRequest.js'
import axios from 'axios'

jest.mock('axios')

describe('ExternalRequest', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should successfully fetch data from a URL and return it as an array of lines', async () => {
    const mockResponse = {
      data: 'Line 1\nLine 2\nLine 3',
    }
    axios.get.mockResolvedValue(mockResponse)

    const url = 'https://www.example.com'
    const result = await getExternalSite(url)

    expect(axios.get).toHaveBeenCalledWith(url)
    expect(result).toEqual(['Line 1', 'Line 2', 'Line 3'])
  })

  it('should handle errors gracefully and return an empty array', async () => {
    const mockError = new Error('Network Error')
    axios.get.mockRejectedValue(mockError)

    const url = 'https://www.example.com'
    const result = await getExternalSite(url)

    expect(axios.get).toHaveBeenCalledWith(url)
    expect(result).toEqual([])
  })
})
