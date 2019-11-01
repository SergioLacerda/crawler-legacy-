import { getExternalSite } from './ExternalRequest.js'

const crawler = async (url, tag) => {
     let rawSite = await getExternalSite(url)

     if(tag){
      rawSite = rawSite.filter(line => foundTag(line , tag) )
     }

     return rawSite
}

const foundTag = (line , tags) => {
   for (const tag of tags) {
      if (line.includes(tag)) {
         return true
      }
   }

   return false
}

export { crawler }