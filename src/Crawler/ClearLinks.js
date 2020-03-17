const clear = (rawLines , inputTags) => {
   const tags = inputTags instanceof Array ? inputTags : [inputTags]

    const result = []

    for (const rawLine of rawLines) {
       const line = removeSpecialChars(rawLine)

       result.push(...iterateThroughTags(line, tags))
    }

    return result
 }

 const iterateThroughTags = (line, tags) => {
   const result = []

   for (const tag of tags) {
      result.push(...getContent(line, tag))
   }

   return result
}

const getContent = (line, tag) => {
   return line.split('"')
              .filter(x => x.includes(tag))
}
 
const removeSpecialChars = (lineTarget) => {
   return lineTarget.replace(/(\r\n\t|\n|\r|\t)/gm, "")
}

export { clear, removeSpecialChars }