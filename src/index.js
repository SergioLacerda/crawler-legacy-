import { crawler } from './Crawler/Crawler.js'
import { clear } from './Crawler/ClearLinks'
import { readMultipleSouces } from './Crawler/MultipleSources'
import { readFile, saveFile } from './FileUtils/File.js'
import yargs from 'yargs'

const argv = yargs
    .usage('example: yarn run start --url https://www.ahnegao.com.br --tags youtube')
    .option('url', {
        description: 'any url. Example: https://site.com',
        type: 'string',
    })
    
    .option('multipleSources', {
        description: 'inform path of file with sources. Example: ./src/Crawler/manySources.txt',
        type: 'array',
    })

    .option('tags', {
        description: 'inform one or an array of tags to filter. Example: youtube vimeo',
        type: 'array',
    })
    .option('fileName', {
        description: 'inform name of filename output, without this arg wont create a file. Example: xablau',
        type: 'string',
    })
    .help()
    .alias('help', 'h')
    .argv;

const start = async () => {

    const { url, tags = '.mp4', fileName, multipleSources='C:\\dev_project\\crawler\\src\\Output\\source.txt'} = argv

    if(multipleSources){
        console.log("STARTED: via multipleSources");

        const rawSources = await readFile(multipleSources).split('\n')

        await readMultipleSouces(rawSources, tags)

        console.log("finish index");
        process.exit(0);
    }
    
    if (!url) {
        console.error("URL is required!");
        process.exit(1);
     }

    console.log("start index")

    const rawSite = await crawler(url)

    const clearLinks = clear(rawSite, tags)

    if(fileName){
        saveFile(fileName, clearLinks)
    }else{
        console.log(`------\n${clearLinks}\n------`)
    }

    console.log("finish index")
}

start()
