import { crawler } from './Crawler/Crawler.js'

import fs from 'fs';

const start = async () => {
    console.log("start index")
    const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States'

    const rawSite = await crawler(url)
    
    console.log(rawSite)

    console.log("finish index")
}

start();