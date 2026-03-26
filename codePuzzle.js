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
    
    for (let char of str) {
      if (char === "(") {
        depth++;
      }
      if (char === ")") {
        depth--;
      }
      if (char === "," && depth === 0) {
        wordsArr.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    wordsArr.push(current.trim());

    if (isSorted) {
      wordsArr.sort();
    }

    wordsArr.forEach(word => {
      if (word) {
        if (word.includes("(")) {
          // regex for splitting 1st word & the rest of parens
          const [name, rest] = word.split(/\((.*)\)/); 
          if (name) {
            console.log(`${"  ".repeat(indent)}- ${name.trim()}`);
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