import { crawler } from './Crawler/Crawler.js'
import { clear } from './Crawler/ClearLinks'
import { readMultipleTargets } from './Crawler/MultipleTargets'
import { readFile, saveFile } from './FileUtils/File.js'
import yargs from 'yargs'

const argv = yargs
    .usage('example: yarn run grabLinks --url https://www.ahnegao.com.br --tags youtube')
    .option('url', {
        description: 'any url. Example: https://site.com',
        type: 'string',
    })
    
    .option('multipleTargets', {
        description: 'inform path of file with multiple targets. Example: c:\\dev\\crawler\\src\\output\\source.txt',
        type: 'string',
    })

    .option('tags', {
        description: 'inform one or an array of tags to filter. Example: youtube vimeo',
        type: 'array',
    })
    .option('outputFilename', {
        description: 'inform filename of output, without this arg wont create a file. Example: xablau',
        type: 'string',
    })
    .help()
    .alias('help', 'h')
    .argv;

const start = async () => {

    const { url = '', tags, outputFilename = 'outputFile', multipleTargets = ''} = argv

    console.log(`ARGV url: ${url}\n`)
    console.log(`ARGV tags: ${tags}\n`)
    console.log(`ARGV outputFilename: ${outputFilename}\n`)
    console.log(`ARGV multipleTargets: ${multipleTargets}\n`)
    console.log(`---`)

    if(multipleTargets && multipleTargets!== ''){
        console.log("Started: via multiple targets");

        const rawSources = await readFile(multipleTargets).split('\n')

        await readMultipleTargets(outputFilename, rawSources, tags)

        console.log("finish index");
        process.exit(0);
    }
    
    if (url && url !== '') {
        console.log("Started: via single target");

        const rawSiteContent = await crawler(url)

        const grabbedTargets = clear(rawSiteContent, tags)

        saveFile(outputFilename, '01', grabbedTargets)
    }
    
    console.log("finish index")
}

start()
