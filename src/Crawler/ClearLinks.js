const clear = (rawLines , tags) => {
    const result = []

    for (const rawLine of rawLines) {
       const line = rawLine.replace(/(\r\n\t|\n|\r|\t)/gm, "")

       iterateThroughTags(line, tags, result)
    }

    return result
 }

 const iterateThroughTags = (line, tags, result) => {
   if(tags instanceof Array){
      for (const tag of tags) {
         result.push(getContent(line, tag))
       }
   }else{
      result.push(getContent(line, tags))
   }
}

const getContent = (line, tag) => {
   return line.split('"')
              .filter(x => x.includes(tag))
}
 
export { clear }