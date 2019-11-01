const clear = (rawLines , inputTags) => {
   const tags = inputTags instanceof Array ? inputTags : [inputTags]

    const result = []

    for (const rawLine of rawLines) {
       const line = rawLine.replace(/(\r\n\t|\n|\r|\t)/gm, "")

       iterateThroughTags(line, tags, result)
    }

    return result
 }

 const iterateThroughTags = (line, tags, result) => {
   for (const tag of tags) {
      result.push(...getContent(line, tag))
   }
}

const getContent = (line, tag) => {
   return line.split('"')
              .filter(x => x.includes(tag))
}
 
export { clear }