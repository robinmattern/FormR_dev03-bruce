

 aDir = __dirname.replace( /[\/\\]/g, '/')
 aDir = process.cwd()
 aDir = process.argv[2] ? process.argv[2] : aDir
 aDir = aDir.replace( /[\/\\]/g, '/')

 console.log( "\naDir:  ", aDir )

 aDir1 = aDir.match( /client/) ? aDir.replace( /(client[0-9])\/.+/, "$1"   ) : ''
 aDir1 = aDir.match( /server/) ? aDir.replace( /(server[0-9])\/.+/, "$1"   ) : aDir1
 aDir1 = aDir.match( /docs/  ) ? aDir.replace(          /docs\/.+/, "docs" ) : aDir1

 aRoot = aDir.match( /client/) ? aDir.replace( /(client[0-9])\/*.*/, "" ) : ''
 aRoot = aDir.match( /server/) ? aDir.replace( /(server[0-9])\/*.*/, "" ) : aRoot
 aRoot = aDir.match( /docs/  ) ? aDir.replace(          /docs\/*.*/, "" ) : aRoot


 aStg  = aDir.replace( aRoot, '' ).replace( /\/.+/, '')
 aApp  = aDir.replace( aDir1, '' ).substr(1).replace( /_v[0-9]+/, '' )
 aApp  = aApp.replace( /\/.+/, '' )

      console.log( "aRoot: ", aRoot)
      console.log( "aDir1: ", aDir1)
      console.log( "aApp:  ", `${aStg}-${aApp}`,  "\n" )

  if (aApp.match( /^app/i )) {

      mFiles = require( 'fs' ).readdirSync( `${aRoot}/docs/Apps` )

      aAppMDfile = mFiles.filter( aFile => aFile.match( `${aStg}-${aApp}.md` ) ).join()
  if (aAppMDfile) {
      console.log( `   Opening App markdown file: ./docs/Apps/${aAppMDfile}.` )
      require("child_process").exec( `textpad "${aRoot}/docs/Apps/${aAppMDfile}"` )
  } else {
      console.log( `\n ** Could not find a Docs markdown file for ${aStg}-${aApp}.` )
      console.log( `    ./docs/Apps/` + mFiles.filter( aFile => aFile.match( `${aStg}` ) ).join(`\n    ./docs/Apps/` ) )
      }

    } else {
      console.log( `\n ** The directory, ./${aStg}, of the file being edited needs to be an App directory.` )
      }

      console.log( "" ) 
