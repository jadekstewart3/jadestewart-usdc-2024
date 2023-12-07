/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 

//**Initial thoughts */
// iterate over the scannedTextObj["Content"]
// iterate over the text
// for each line, check if the searchTerm is in the line
//if it is place the ISBN page and line number in the results array in a JSON object
//what happnens if the text is hyphenated, but it is the search term? how do you account for that?

//**psudocode for processing hyphenated words */
/**if the last element includes a hyphen
 * remove the hyphen from the last element
 * add the next element to the last element
 * and check if the searchTerm is in the new last element
 * if its true, add the ISBN, page and line number to the results array plus the next index
 * if its false, check the next element
 */

function identifyAndReplaceHyphenatedWord(lastWord, index, contentArray) {
  if (lastWord.endsWith("-") && index < contentArray.length) {
    const nextTextArray = contentArray[index + 1].Text.split(" ");
    const nextWord = nextTextArray[0].trim();
    const unhyphenatedWord = lastWord.replace(/-$/, "") + nextWord;
    return unhyphenatedWord;
  }
};

function processHyphenatedWord(lastWord, index, contentArray, contentHash, searchTerm, results, book) {  
  if (identifyAndReplaceHyphenatedWord(lastWord, index, contentArray) === searchTerm) {
      results.push({
        ISBN: book.ISBN,
        Page: contentHash.Page,
        Line: contentHash.Line
      });
      results.push({
        ISBN: book.ISBN,
        Page: contentArray[index + 1].Page,
        Line: contentArray[index + 1].Line
      });
    }
  }

  function errorHandle(searchTerm, scannedTextObj) {
    if (scannedTextObj.length == 0 || scannedTextObj[0].Content.length == 0) {
      return { SearchTerm: searchTerm,
                Results: []
              };
    } else if (searchTerm == "") {
      return "Please enter a search term."
    };
  };

function findSearchTermInBooks(searchTerm, scannedTextObj) {
  const results = [];
  if (errorHandle(searchTerm, scannedTextObj)) {
    return errorHandle(searchTerm, scannedTextObj);
  };

  scannedTextObj.forEach((book) => {
    book.Content.forEach((contentHash, index, contentArray) => {
      const currentTextArray = contentHash.Text.split(" ");
      const lastWord = currentTextArray[currentTextArray.length - 1].trim();
      if (currentTextArray.includes(searchTerm)) {
        results.push({
          ISBN: book.ISBN,
          Page: contentHash.Page,
          Line: contentHash.Line
        });
      } else{
        processHyphenatedWord(lastWord, index, contentArray, contentHash, searchTerm, results, book)
      };
    });
  });

  return {
    SearchTerm: searchTerm,
    Results: results
  };
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

const twentyLeaguesHyphenated = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then pro-found; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

const zeroBook = []

const twentyLeaguesNoContent = [
  {
    "Title": "Twenty Thousand Leagues Under the Sea",
    "ISBN": "9780000528531",
    "Content": []
  }
]
    
/** Example output object */
const twentyLeaguesOut =
    {
      "SearchTerm": "the",
    "Results": [
      {
          "ISBN": "9780000528531",
          "Page": 31,
          "Line": 9
      }
    ]
  }

const twentyLeaguesDark =
  {
    "SearchTerm": "darkness",
    "Results": [
      {
        "ISBN": "9780000528531",
        "Page": 31,
        "Line": 8
      },
      {
        "ISBN": "9780000528531",
        "Page": 31,
        "Line": 9
      }
    ]
  }

  const twentyLeaguesHyphenatedOut = {
    "SearchTerm": "profound",
    "Results": []
  }

  const zeroBookOut = {
    "SearchTerm": "the",
    "Results": []
  }

  const noResultsOut = {
    "SearchTerm": 'the',
    "Results": []
  }

  const caseSensitiveOut = {
    "SearchTerm": "Momentum",
    "Results": []
  }

  const wordNotPresentOut = {
    "SearchTerm": "cactus",
    "Results": []
  }

  const twentyLeaguesThe = {
      "SearchTerm": "The",
      "Results": [
        {
        "ISBN": "9780000528531",
        "Page": 31,
        "Line": 8,
      }
    ]
  }
/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
  console.log("FAIL: Test 1");
  console.log("Expected:", twentyLeaguesOut);
  console.log("Received:", test1result);
  console.log("Actual:", test1result);
  console.log("Expected:", twentyLeaguesOut);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/**  test to ensure we do not return results for substrings. */
const test3result = findSearchTermInBooks("simp", twentyLeaguesIn); 
if (test3result.Results.length == 0) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test3result.Results.length);

}

/** test to handle hyphenated words */
const test4result = findSearchTermInBooks("darkness", twentyLeaguesIn); 
if (test4result.Results.length == 2) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test4result.Results.length);
}

/**test to ensure a hyphenated search term is returning the expected object */
const test5result = findSearchTermInBooks("darkness", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesDark) === JSON.stringify(test5result)) {
  console.log("PASS: Test 5");
} else {
  console.log("FAIL: Test 5");
  console.log("Expected:", twentyLeaguesDark);
  console.log("Received:", test5result);
}

/**test for no books*/
const test6result = findSearchTermInBooks("the", zeroBook);
if (JSON.stringify(test6result) === JSON.stringify(zeroBookOut)) {
  console.log("PASS: Test 6");
} else {
  console.log("FAIL: Test 6");
  console.log("Expected:", zeroBookOut);
  console.log("Received:", test6result); 
}

/**test for books but no content*/
const test7result = findSearchTermInBooks("the", twentyLeaguesNoContent);
if (JSON.stringify(test7result) === JSON.stringify(noResultsOut)) {
  console.log("PASS: Test 7");
} else {
  console.log("FAIL: Test 7");
  console.log("Expected:", noResultsOut);
  console.log("Received:", test7result);
}

/**case sensitive test*/
const test8result = findSearchTermInBooks("momentum", twentyLeaguesIn);
if (test8result.Results.length == 0) {
  console.log("PASS: Test 8");
} else {
  console.log("FAIL: Test 8");
  console.log("Expected:", caseSensitiveOut.Results.length);
  console.log("Received:", test8result.Results.length);
}

/**test to make sure we are only dealing with hyphenated words at the end of a sentance*/
const test9result = findSearchTermInBooks("profound", twentyLeaguesHyphenated);
if (test9result.Results.length == 0) {
  console.log("PASS: Test 9");
} else {
  console.log("FAIL: Test 9");
  console.log("Expected:", twentyLeaguesHyphenated.Results.length);
  console.log("Received:", test9result.Results.length);
}

/**test for word that doesnt exist in the text*/
const test10result = findSearchTermInBooks("cactus", twentyLeaguesIn);
if (test10result.Results.length == 0) {
  console.log("PASS: Test 10");
} else {
  console.log("FAIL: Test 10");
  console.log("Expected:", wordNotPresentOut.Results.length);
  console.log("Received:", test10result.Results.length);
}

/**test for The not the*/
const test11result = findSearchTermInBooks("The", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesThe) === JSON.stringify(test11result)) {
  console.log("PASS: Test 11");
} else {
  console.log("FAIL: Test 11");
  console.log("Expected:", twentyLeaguesThe);
  console.log("Received:", test11result);
}

/**test for empty search term */
const test12result = findSearchTermInBooks("", twentyLeaguesIn);
if (test12result == "Please enter a search term.") {
  console.log("PASS: Test 12");
} else {
  console.log("FAIL: Test 12");
  console.log("Expected:", "Please enter a search term.");
  console.log("Received:", test12result);
}