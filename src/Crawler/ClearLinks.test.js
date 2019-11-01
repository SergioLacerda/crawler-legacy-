import { clear } from './ClearLinks.js'

const rawLines = [ '					<p><iframe src="https://www.youtube.com/embed/YJWmQju1Fvs" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"><span data-mce-type="bookmark" style="display: inline-block; width: 0px; overflow: hidden; line-height: 0;" class="mce_SELRES_start">﻿</span></iframe></p>',
                   '					<p><iframe src="https://www.youtube.com/embed/BRXhzwMcfa8" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"></iframe></p>',
                   '					<p><iframe src="https://www.youtube.com/embed/V7gMhgInftI" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"></iframe></p>']

const clearedLines = ['https://www.youtube.com/embed/YJWmQju1Fvs',
                      'https://www.youtube.com/embed/BRXhzwMcfa8', 
                      'https://www.youtube.com/embed/V7gMhgInftI']

test.only('Clear youtube links', async () => {

    const result = clear(rawLines, 'youtube')

    expect(result).not.toBe(undefined)

    expect(result).toHaveLength(3)

    expect(expect.arrayContaining(result)).toEqual(clearedLines)
})