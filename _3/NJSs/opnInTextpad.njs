
   aFile  = process.argv[2].replace( /[\/\\]/g, '/')
// console.log( `aFile: ${aFile}` )
   require("child_process").exec( `textpad "${aFile}"` )

