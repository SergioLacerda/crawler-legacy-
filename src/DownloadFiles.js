import yargs from 'yargs/yargs'

import { startCadencedDownloads, startParalelDownloads } from './Download/Download.js'
import { readFile } from './FileUtils/File.js'

const argv = yargs(process.argv.slice(2))
    .usage('example: npm run download --inputLinks c:\\dev\\crawler\\src\\output\\source.txt --outputFilename sample')
    .option('inputLinks', {
        description: 'filepath with one or any links. Example: c:\\dev\\crawler\\src\\output\\source.txt',
        type: 'string',
    })
    .option('outputFilename', {
        description: 'inform filename of output, without this arg wont create a file. Example: xablau',
        type: 'string',
    })
    .option('paralel', {
        description: 'inform for downloads all files at once. Default false',
        type: 'boolean',
    })
    .help()
    .alias('help', 'h')
    .argv

const start = async () => {
    const { inputLinks, outputFilename, paralel = false } = argv

    console.log(`ARGV inputLinks: ${inputLinks}\n`)
    console.log(`ARGV outputFilename: ${outputFilename}\n`)
    console.log(`ARGV paralel: ${paralel}\n`)
    console.log(`---`)
    console.log("Download files Start!")

    const rawLinks = await readFile(inputLinks).split('\n')

    if(paralel){
        await startParalelDownloads(rawLinks, outputFilename)
    }else{
        await startCadencedDownloads(rawLinks, outputFilename)
    }
    
    console.log("Download files Finish!")
}

start()

