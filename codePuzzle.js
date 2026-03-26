const parseString = (str, isSorted = false) => {

  if (typeof str !== 'string') {
    return console.log('Please Enter a Valid String')
  }

  let cleanStr = str.trim();
  if (cleanStr.startsWith("(") && cleanStr.endsWith(")")) {
    cleanStr = cleanStr.slice(1, -1);
  }

  const parseDeeper = (str, indent = 0) => {
    const wordsArr = [];
    let current = "";
    let depth = 0;
    
    // loop through each charater in string
    for (let char of str) {
      if (char === "(") {
        depth++;
      }
      if (char === ")") {
        depth--;
      }
      // only push into wordsArr if it ends with "," && current depth = 0 
      if (char === "," && depth === 0) {
        wordsArr.push(current.trim());
        current = "";
      } else {
        // else keep building current word
        current += char;
      }
    }
    // push last current word
    wordsArr.push(current.trim());

    if (isSorted) {
      wordsArr.sort();
    }

    // loop through wordsArr on each element
    wordsArr.forEach(word => {
      if (word) {
        if (word.includes("(")) {
          // regex for splitting 1st word & the rest of parens
          const [name, rest] = word.split(/\((.*)\)/); 
          if (name) {
            console.log(`${"  ".repeat(indent)}- ${name.trim()}`);
            // call parseDeeper with the rest of parens + add indentation
            parseDeeper(rest, indent + 1);
          }
        } else {
          console.log(`${"  ".repeat(indent)}- ${word}`);
        }
      }
    });
  };

  parseDeeper(cleanStr);
};