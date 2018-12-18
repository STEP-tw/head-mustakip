File : libraryTest.js

   lineNum: 1
   description: destructuring of deepEqual instead of assert. DONE

   type: long file
       lineNum: none
       description: findErrors must be in a different file. DONE

   type: test message not clear
       lineNum: 23
       description: ‘alphanumberic’ looks better than ‘word’. DONE

       lineNum : 43, 30
       description: ‘when’ is not described DONE

   type: repitition
       lineNum: none
       description: using ‘head’ and ‘tail’ at lot of places in message. It could have be written in descibe block. DONE

       lineNum: 481 - 483
       description: no need for testing on same type of inputs. DONE

   type: variable name
       lineNum: 270
       description: ‘fileName’ is actually filePath. DONE 

   type: not generic
       line: 270, 283
       description: readFileSync and existsSync should be generic DONE

   type: not enough test
       line: 422
       description: no test for default cases. DONE

fileName: library.js

   type: variable name
       lineNum: 3
       description: ‘string’ DONE

       lineNum: 29, 33
       description: ‘isValidCount’, ‘isValidOption’ 

       lineNum: 81, 98
       description: ‘x’ is actually ‘filePath’ and ‘file’ is actually ‘filePaths’

       lineNum: 101
       description: 'headList' is not clear. Names like 'filteredContents' are better.

       lineNum: 40
       description: 'isValid' could be named better.

       lineNum: 78
       desciption: the 'getHead' function does the work of tail also.

   type: duplication
       lineNum: -
       description: getLines and getChars are same except delimiter.

   type: logicError
       lineNum: 91
       description: no need to compare with ‘false’.

   type: readability
       lineNum: 82, 98
       description: use of ‘if’ is better than using ‘ternary operator’

   type: params order
       lineNum: 3, 16
       description: it’s better to use ‘string’ as a first parameter.

       lineNum: 78
       description: it’s better to use ‘fs’ as second params.

   fileName: parsindInput.js

       type: fileName
       description: ‘parseInput’ is better than continuous form.

       type: long function
       lineNum: 3
       description: extractArgs is too large. Small functions could be extracted from it.

       type: readabilty
       desciption: if conditions could be extracted into one liner functions.

       type: variableName
       description: doesIncludeNumber

       type: not correct checks in if
       lineNum: 3-24.

    fileName: head.js

        lineNum: 6
        desciption: it's better to send userArgs directly to library and let the lib do             the work of parsing.
