
       var  JScriptVer = 2.5                                                                                // .(10830.02.1 RAM)

  function  shoHelp( aFns ) {
       var  aStr  = '\n'; aFns += '' 
        if (aFns.match(/fns|all/)) {                                                                        // .(10830.01.1 RAM Was = 'vars')
            aStr += '  FormR Fns & Vars u2.51\n'
                  + '  -------------------------------------\n'
                  + '    init( aFileName )\n'
                  + '    setEnv( aFileName )\n'
                  + '    sndAPI( aFileName )\n'
                  + '    shoModel( pDB, aModel )\n'
                  + '    shoRoutes( pApp, aShoEm, nWdt )\n'
                  + '    sndAPI( aMethod, aURL, pData, aToken, xNext ); uses bQuiet'                        // .(10829.03.2)
                  + '    db_logging( pDB, bOnOff )\n'
                  + '    trace( aMsg, bShow )\n'
                  + '    doTest( aTest(s) )\n'
                  + '    \n'
        } else {
            aStr += '  FormR Vars u2.51\n'
                  + '  -------------------------------------\n'
            }
            aStr += `    APP_NAME:     ${APP_NAME}\n`
                  + `    APP_HOME:     ${APP_HOME}\n`
        //        + `    DB_DIR:       ${DB_DIR}\n`
                  + `    APP_HOME_API: ${APP_HOME_API}\n`
                  + `    FORMRs_4_API: ${FORMRs_4_API}\n`                                                   // .(10414.01.2)
                  + `    FORMRs_4:     ${FORMRs_4}\n`
        //        + `    FORMRc_4:     ${FORMRc_4}\n`                                                       // .(10905.03.1 RAM They don't exist yet)
                  + `    FORMRs_3:     ${FORMRs_3}\n`
        //        + `    FORMRc_3:     ${FORMRc_3}\n`                                                       // .(10905.03.2)
                  + `    BRANCH_HOME:  ${BRANCH_HOME}\n`
                  + `    DB_LOGGING:  '${process.env.DB_LOGGING}'\n`                                        // .(10905.04.1 Beg RAM)
                  + `    DO_TRACING:  '${process.env.DO_TRACING}'  (bQuiet: ${bQuiet}, aShowEm: '${typeof(aShowEm) == 'undefined' ? '' : aShowEm }')\n`    
                  + `    SHOW_ROUTES  '${process.env.SHOW_ROUTES}'\n`                                       // .(10905.04.1 End)
                  + `    USE_DEFAULT_CONTROLLERS: '${process.env.USE_DEFAULT_CONTROLLERS}'\n`               // .(10919.04.1 RAM)
                  + `    DONT_USE_DEFAULT_CONTROLLERS: '${process.env.DONT_USE_DEFAULT_CONTROLLERS}'`       // .(10919.04.2 RAM)
            say( aStr + "\n" )

        if (aFns.match(/jst|all/)) {                                                                        // .(10830.01.2 RAM 'jstools')
            jstFns.help()                                                                                   // .(10829.03.1)
            }                                                                                               // .(10830.01.3)
            }
//          --------------  =  ----------------------------------------------------

  function  shoRoutes( pApp, aShoRoutes, nWdt ) {                                                           // .(10326.04.1 RAM Add nWdt arg)
//          nWdt       =                  `${aShoRoutes}`.match(      /[0-9]+/) ? aShoRoutes : ( nWdt ? nWdt : 40)  //#.(10326.04.2).(10905.06.1)
            nWdt       =  nWdt ? nWdt : ( `${aShoRoutes}`.match( /[2-9][0-9]+/) ? aShoRoutes : 40 )         // .(10905.06.1 RAM aShoRoutes could be 1)
        if (String(aShoRoutes).match( /false|0/i )) { return }                                              // || ! require( 'fs' ).existsSync( '../../server/node_modules/express-list-endpoints' ) ) { return }

//     var  aModDir    = (typeof(APP_DIR) == 'undefined')  ? ''
//                     : `${BRANCH_HOME}/${ APP_DIR.split( '/' )[0] }/node_modules/`                        // .(10305.02.1 RAM Gotta get server or client folder name)
       var  nDepth     =    APP_HOME.match( /FR.app/i ) ? 2 : 1                                             // .(10328.05.5 RAM Jeese Louise to the 4th!)
       var  aModDir    = `${APP_HOME.split( /[\\/]/ ).slice( 0, -nDepth ).join('/')}/node_modules`          // .(10328.05.6)
//ry { var  listRoutes =  require( '../../server/node_modules/express-list-endpoints' ) } catch(e) {        // .(10224.02.1 RAM Bruce doesn't have it loaded).(10301.14.1 RAM Moving it here requires a different path)
//ry { var  listRoutes =  require( 'express-list-endpoints' ) } catch(e) {                                  // .(10305.02.1 RAM Left over from testing if it exists with pFS.existsSync).(10328.05.6 RAM Probably OK now)
 try { var  mRoutes    =  require( `${aModDir}/express-list-endpoints` )( pApp ) } catch(e) {               // .(10305.02.1.(10323.02.1 RAM Was listRoutes = require())
            console.log( " ** The module, express-list-endpoints, is not installed");                       // .(10224.02.1 RAM Above no working because it running in Master folder)
            return }
            console.log( "\n" + mRoutes.map( pRoute => fmtRoute( pRoute ) ).join( "\n" ) )                  // .(10323.02.2 RAM Was listRoutes( pApp))

  function  fmtRoute( pRoute ) {
       var  aRoute =  pRoute.path, aStr = '', i=0
            pRoute.middleware.map( aController => {  // aMiddle ?                                           // .(10323,02.3 RAM He uses the same middleware name for each method. S.B. different for each)
            pRoute.methods   .map( aMethod => { var aRoute2 = `${aRoute} ${ aController}`
//          aStr  += `\n    ${ aMethod.padEnd( 6 ) } ${ aPath.padEnd( 30 ) } ${ aMiddle } (${ i++ })` } )
            aStr  += `\n    ${ aMethod.padEnd( 6 ) } ${ aRoute.padEnd( nWdt ) } ${ aController } (${ i++ })` }) // .(10326.04.3)
            } )
     return aStr.substr(1) // + "\n"
            } }
//          --------------  =  ----------------------------------------------------

  function  shoModel( pDB, aModel ) {
       var  pModel =  getModel( pDB, aModel )
        if (typeof(pModel) == 'string') { console.log( pModel ); return }                                   // .(10905.01.2 RAM)
       var  mStr   =  [ 'var pModel ='
                      , ` {  ModelName : '${pModel.ModelName}'`
                      , `    TableName : '${pModel.TableName}'`
                      , `    DBSN Name : '${pModel.DBSN}'`                                                  // .(10405.01.2)
                      , ` ,  Schema    :`
                      , `     { "ColName(12)" :[ 'DataType(12)', 'Label(16)'       , 'FormType(12)', 'Format(11)', 'OtherParms()' ]`
                      , '        -----------      ------------    ----------------    ------------    ----------    --------------------------------'
//                    , `     ,  id           :[ 'int'         , "Id"              , 'id'          , 'R10'       , 'NOT NULL INCREMENT PRIMARY KEY' ]`
                      ,     ...  fmtCols( pModel.Schema )
                      , `        }`
                      , ` ,  HelpMessages :`
                      ,    ...   Object.keys( pModel.HelpMessages ).map( aCol => fmtHelp( aCol, pModel.HelpMessages[ aCol ] ) )
                      , `  }`
                      , `}`
                         ]

            console.log( "\n--- -----------------------------------------------------------------------------------------------------------------------")     // .(10405.01.2)
            console.log( mStr.join( '\n' ) )

   function fmtCols(  pSchema ) {
        var mCols  =  Object.keys( pSchema ).map( aCol => `     ,  ${ aCol.padEnd(13) }:[ ${ pSchema[ aCol ].join( ', ' ) } ]` )
     return mCols.slice(1)
            }
   function fmtHelp( aCol ) { return aCol }
            }
//          --------------  =  ----------------------------------------------------

function getModel( pDB, aModel ) {
       var  pModel_Sqz = aModel ? pDB[ aModel ] : pDB                                                       // .(10418.01.1 RAM Pass just a Sequilize Model)
      if (! pModel_Sqz) { return `** Model, '${aModel}', not found` }                                        // .(10905.01.1 RAM)
       var  pModel =
             {  ModelName : pModel_Sqz.name                                                                 // .(10418.01.2 RAM Was: pDB[ aModel ])
             ,  TableName : pModel_Sqz.tableName                                                            // .(10418.01.2 RAM Was: pDB[ aModel ].name)
             ,  DBSN      : pModel_Sqz.DBSN                                                                 // .(10405.01.3)
             ,  Schema    :
                 { "ColName(12)" :[ 'DataType(12)', 'Label(16)'       , 'FormType(12)', 'Format(11)'             , 'OtherParms()' ] }
              }
            Object.keys( pModel_Sqz.fieldRawAttributesMap ).forEach( aCol => {                              // .(10418.01.4)
       var  pCol      =  pModel_Sqz.fieldRawAttributesMap[ aCol ]                                           // .(10418.01.5)
       var  pType     =  pCol.type, aType = `${pType}`.replace( /\(.+/, '' )
       var  aWdt      =  pType._length ? `(${pType._length})` : ''
            pModel.Schema[ aCol ] = [ fmtCol( 12, `${aType}${aWdt}` )                                       // DataType
                                    , fmtCol( 16, aCol .substr(0,1).toUpperCase() +  aCol.substr(1), '"' )  // Label
                                    , fmtCol( 12, aType.substr(0,1) + aType.substr(1).toLowerCase() )       // FormType
                                    , fmtCol( 11, '' )                                                      // Format
                                    , fmtCol(  0,  fmtOth( pType.options, pCol ) )                          // OtherParms
                                       ]
            pModel.HelpMessages = {}
                    } ) // eol pDB[ aModel ].fieldRawAttributesMap ).forEach
   function fmtCol( nWdt, aCol, q ) { q = q ? q : "'"; return `${q}${aCol}${q}`.padEnd( nWdt + 2 )
            }
   function fmtOth( pOptions, pCol ) {
       var  aStr = (pOptions._zerofill ? ' NOT NULL'    : '' )
                 + (pCol.autoIncrement ? ' INCREMENT'   : '' )
                 + (pCol.primaryKey    ? ' PRIMARY KEY' : '' )
    return  aStr.substr(1)
            }
    return  pModel
            } // eof fmtCols
//          --------------  =  ----------------------------------------------------

  function  setAppDirs( aDirName ) { // trace()                                                             // .(01012.01.2 Beg).(10303.02.1 RAM Moved to JScript.njs).(10317.04.1 RAM Split out setAppDirs function)

//      if (typeof( aDirName ) == 'undefined' ) {                                                           // .(10301.11.1 RAM __dirname is not in v10.12+).(10316.12.1 Beg RAM Do it here).(10402.03.1 RAM ??)
        if (typeof( aDirName ) == 'undefined' || aDirName == '') {                                          // .(10301.11.1 RAM __dirname is not in v10.12+).(10316.12.1 Beg RAM Do it here).(10402.03.1 RAM ??)
//    var __dirname  =  path.dirname( __filename );
//    var __dirname  =  path.resolve( path.dirname( decodeURI( new URL( import.meta.url).pathname ) ) );
//        __dirname  =  require('path').resolve( path.dirname( '' ) );
//    var   aError   =  new Error; aDirName = aError.stack.split( '\n' )          [2].replace( /.+\(/, '' ).split( /[\\/]/).slice(0,-1).join('/')
//    var   aError   =  new Error; aDirName = aError.stack.split( '\n' ).slice(-1)[0].replace( /.+\(/, '' ).split( /[\\/]/).slice(0,-1).join('/')
      var   mErrors  = (new Error).stack.split( '\n' )
//          aDirName =  mErrors.slice(-1)[0].match(    /node:internal/  ) ? mErrors[2] : mErrors.slice(-1)[0]  //#.(10317.04.1 RAM Don't know why this is there sometimes)
//          aDirName =  mErrors[2].match( /[\\/](api|src|server   ).*/i ) ? mErrors[2] : mErrors.slice(-1)[0]  //#.(10317.04.1 RAM Don't know why this is there sometimes; mErrors.slice(-1)[0] gets the last row).(10920.04.2)
            aDirName =  mErrors[2].match( /[\\/](api|src|server|_3).*/i ) ? mErrors[2] : mErrors.slice(-1)[0]  // .(10317.04.1 RAM Don't know why this is there sometimes; mErrors.slice(-1)[0] gets the last row).(10920.04.2)
            aDirName =  mErrors[3].match( /[\\/](api|src|server|_3).*/i ) ? mErrors[3] : aDirName              // .(10317.04.1 RAM Last try).(10920.04.3)
//          aDirName =  aDirName.replace(     /.+\(/, ''  ).split( /[\\/]/ ).slice(0,-1).join( '/' )           // .(10317.04.1 RAM The calling dir ??).(10920.04.4)
            aDirName =  aDirName.replace( /(at +|.+\()/, '' ).split( /[\\/]/ ).slice(0,-1).join( '/' )         // .(10317.04.1 RAM The calling dir ??).(10920.04.4 RAM Sometimes its "at C:\...", not "at (C:\...)" )
            }                                                                                                  // .(10316.12.1 End)
//          --------------  =  ---------------------------------------

       if ( aDirName.match( /internal[/\/]modules[/\/]cjs/)) {
            console.log( " ** Not finding aDirName **"); return 
            }

        if (typeof(APP_NAME) == 'undefined') { APP_HOME =  ''; APP_NAME = '' }                              // .(10318.02.6 RAM Good grief)

       var  aFR_app4s      =    'FR.app02s'                                                                 // .(10920.03.1 Beg)
       var  aFR_app4c      =    'FR.app02c'
       var  aFR_fns3s      =    '_3[\\/]FR.FNSs'

//     var  rFR_app        = new RegExp( 'server.+([\\/]' +           'app' +                ')*" )         //#.(10318.03.2)
//     var  rFR_app        = new RegExp( "server.+([\\/]( [0-9][cs]- | app[0-9] | [0-9][cs] ) )*" )         //#.(10318.03.2)
       var  rFR_apps       = new RegExp( "server.+([\\/]([0-9][cs]-|app[0-9]|[0-9][cs]))*"        )         // .(10318.03.2)
       var  rFR_app4       = new RegExp( `${aFR_app4s}|${aFR_app4s}` )                                      // .(10920.03.1 End)

//     var  aApp     =  aDirName.split(   /[\\\/]/ ).splice( -4, 4 ).join( '/' )                            //#.(10303.02.3 RAM Let get it from __DirName)
//          aDirName =  aDirName.replace( /[\\/](api|src).*/i, '')                                          //#.(10317.03.1 RAM Peel back to before /api or /src).(10318.02.1)
//          aDirName =  aDirName.replace( /[\\/](api|src|_4).*/i, '')                                       //#.(10317.03.1 RAM Peel back to before /api or /src).(10318.02.1 RAM or _4)
            aDirName =  aDirName.replace( /[\\/](api|src|tests).*/i, '')                                    // .(10317.03.1 RAM Peel back to before /api or /src).(10318.02.1 RAM or _4).(10328.04.x RAM Why _4).(10402.03.2 RAM Added tests)

//     var  nDepth   =  aDirName.match(   /FR.app02s|FR.app02c/ ) ? 3 : 2                                   //#.(10328.05.1 RAM Jeese Louise cubed!).(10920.03.3)
       var  nDepth   =  aDirName.match(   rFR_app4              ) ? 3 : 2                                   // .(10328.05.1 RAM Jeese Louise cubed!).(10920.03.3)

       var  aAppName =  aDirName.split(   /[\\/]/ ).slice( -nDepth ).join( '/' )                            // .(10316.12.2 RAM Just set serverN/appNN*).(10328.05.2)
            aAppName =  aAppName.replace( /master[\\/]/i, '' )                                              // .(10318.02.2)

//      if (aAppName.match( /server.+[\\/]app/    )) {                                                      //#.(10317.03.2).(10318.02.2)
//      if (aAppName.match( /server.+([\\/]app)*/ )) {                                                      // .(10318.02.3 RAM Jeese Louise)
//      if (aAppName.match( /server.+([\\/]app)*/ ) || nDepth == 3) {                                       // .(10318.02.3 RAM Jeese Louise).(10328.05.3 RAM Added FR.app02s. Jeese Louise is right).(10920.03.4)
        if (aAppName.match(            rFR_apps   ) || nDepth == 3) {                                       // .(10318.02.3 RAM Jeese Louise).(10328.05.3 RAM Added FR.app02s. Jeese Louise is right).(10920.03.4)

            APP_NAME = aAppName; process.env.APP_NAME  = aAppName                                           // .(10303.02.1 RAM Needed APP_NAME here. Save it!)
            APP_HOME = aDirName; process.env.APP_HOME  = aDirName                                           // .(10316.12.3 RAM Save APP_HOME too!)
          __dirname  = aDirName; process.env.__dirname = aDirName                                           // .(10303.02.4 RAM Save it too!).(10316.12.4)

        } else {

        if (aAppName.match( aFR_fns3s ) == null) {                                                          // .(10920.03.5 RAM Why are we catching: _3\FR.FNSs)    
            console.log( `  * App, ${aAppName}, is Not an App.` ) }                                         // .(10317.03.3)
            }
//          FORMRs_4 = `${ aDirName.replace( /[\\/]app[0-9]+[sc][0-9]*/i, '' ) }/_4/FR.fns02s/`             // .(10317.01.1 RAM Server's Home if dynamically assigned).(10327.02.1 RAM Allow for trailing no: e.g. app08s1).(10402.03.1 Doit in init())
//                    if ( aDirName.match(   /_4/ ) ) {                                                     // .(10331.02.1 RAM Will we ever get it right).(10402.03.2)
//          FORMRs_4 = `${ aDirName.replace( /_4[\\\/]FR.app02s/, '_4/FR.fns02s/' ) }` }                    // .(10331.02.2).(10402.03.3)
            }
//          --------------  =  ----------------------------------------------------

  function  setEnv(     aDirName ) {                                                                        // .(10317.04.2)
        var pFS      =  require( 'fs' )                                                                     // .(10319.07.1)

//          setAppDirs( aDirName )                                                                          // .(10317.04.3).(10403.05.3 RAM Don't do this here)

//     if (!process.env.PORT) {                                                                             // .(10317.04.4)
//     var  aAppDir  =  aApp.split( '[\\/]' ).splice( -2, 2 ).join( '/' )                                   //#.(10303.02.5).(10317.04.5)
//     var  mEnv     =  require( 'fs' ).readFileSync( `${aDirName}/../../${aAppDir}/.env`, 'ASCII' ).split( '\n' )  // .(10317.04.6)

       var  aEnvFile =  pFS.existsSync( `${APP_HOME}/.env` ) ? `${APP_HOME}/.env` : `${FORMRs_4}.ENV`       // .(10319.07.2 RAM Get it here is exists)
//          console.log( `    aEnvFile: '${APP_HOME}/.env'`)
//try{ var  mEnv     =  require( 'fs' ).readFileSync( `${APP_HOME}/.env`, 'ASCII' )                         //#.(10317.04.6).(10319.07.3)
  try{ var  mEnv     =  pFS.readFileSync( aEnvFile, 'ASCII' )                                               // .(10317.04.6).(10319.07.3)
            mEnv.split( '\n' ).map( aEnv => { if (aEnv) { var v = ( aEnv + '=' ).split( '=' );
                                            v[1] = v[1].replace( /#.+/,    '' )                             // .(10829.02.1 RAM Up to # comment)
                                            v[1] = v[1].replace( / \/\/.+/, '' )                            // .(10905.04.8 RAM Up to //comment)
//          process.env[ v[0] ] =           v[1].replace( /\r/, '' )   } } )                                //#.(10315.04.1)
            process.env[ v[0] ] = chkRegEx( v[1].replace( /\r/, '' ), v[0] )                                // .(10315.04.1 RAM Do it here, Save it in process, not process.env, which is a string)
//          console.log( `  process.env.${  v[0] }: ${ process.env[ v[0] ] }` )
            } } )                                                     
//          }                                                                                               //#.(01012.01.2 End).(10317.04.1)
   } catch( e ) { console.log( ` ** File, '${APP_HOME}/.env', Not Found.` ) }
     return APP_HOME                                                                                        // .(10316.12.2 RAM)
            }
//          --------------  =  ----------------------------------------------------

  function  chkRegEx( aRE, aVar ) {                                                                         // .(10218.04.1 Beg RAM)
        if (aRE.match( /^\// )) {
            process[ aVar ] = new RegExp( aRE.substr(1).replace( /\/$/, '' ) )
    return  process[ aVar ]
        } else {
    return  aRE;
        }   }                                                                                               // .(10218.04.1 End)
//          --------------  =  ----------------------------------------------------

  function  init( aDirname, aFilename ) {                                                                   // .(10402.04.1 RAM Write for FormR.fns).(10403.3 RAM Gotta have both)

            setAppDirs( aDirname )                                                                          // .(10402.04.x RAM Should it be here)
//          jstFns   = require( `${ process.env.FORMR_HOME }/_3/NJSs/JScripts_u2.4.njs` )                   //#.(10228.11.1 RAM Add global utility fns).(10314.02.1 RAM If global you can use anywhere while debugging).(10828.06.2)
//          jstFns   = require( `${ process.env.FORMR_HOME }/_3/NJSs/JScripts_u2.5.njs` )                   //#.(10828.06.2 RAM Latest version).(10830.02.2)
            jstFns   = require( `${ process.env.FORMR_HOME }/_3/NJSs/JScripts_u${JScriptVer}.njs` )         // .(10830.02.2)

            BRANCH_HOME    =        process.env.FORMR_HOME                                                                                                                            // .(10317.03.5)
            APP_HOME       =      ( typeof(APP_HOME) == 'string' ) ? APP_HOME : ''

        if (aFilename == process.mainModule.filename) {                                                     // .(10317.04.8 RAM Run stand-alone for testing)

       var  aFR_fns3s      =    'FR.FNSs'
       var  aFR_fns3c      =    'FR.FNSc'                                                                   // .(10920.02.1 Beg RAM Use Vars)
       var  aFR_app4s      =    'FR.app02s'
       var  aFR_fns4s      =    'FR.fns02s'
       var  aFR_app4c      =    'FR.app02c'
       var  aFR_fns4c      =    'FR.fns02c'

       var  rFR_fns3s      = new RegExp(         `${aFR_fns3s}` )
       var  rFR_app4s      = new RegExp( `_4[\\\/]${aFR_app4s}` )
       var  rFR_fns4s      = new RegExp(         `${aFR_fns4s}` )                                           // .(10920.02.1 Beg RAM Use Vars)

//          setAppDirs()                                                                                    // .(10402.04.x RAM Or here)

//          APP_HOME       =    `${ process.env.FORMR_HOME}/server3/app08s`                                 // .(10318.02.4 RAM We don't know the app when run stand-alone)
            FORMRs_3       =    `${ process.env.FORMR_HOME   }/_3/${aFR_fns3s}/`                            // .(10317.01.1 RAM FormR's Home).(10920.02.9 RAM subsituted var: aFR_fns3s )

//          FORMRc_3       =        FORMRs_3.replace(         /FR.FNSs/,       'FR.FNSc' )                  //#.(10403.05.2 RAM Not exactly the same).(10920.02.7)
            FORMRc_3       =        FORMRs_3.replace(         rFR_fns3s,       aFR_fns3c )                  // .(10403.05.2 RAM Not exactly the same).(10920.02.7)
            
//          FORMRs_4       =    `${ APP_HOME.replace( /[\\/]app[0-9]+[sc][0-9]*/i, '' ) }/_4/FR.fns02s/`    //#.(10317.01.1 RAM Server's Home if dynamically assigned).(10327.02.1 RAM Allow for trailing no: e.g. app08s1).(10901.02.1)

//          FORMRs_4       =    `${ APP_HOME.replace( /[\\/]\w+$/,         '/_4/FR.fns02s/' ) }`            //#.(10901.02.1 RAM Remove trailing app name whatever it may be).(10920.02.2)
//          FORMRs_4       =    `${ APP_HOME.replace( /[\\/]\w+$/,      `/_4/${aFR_fns4s}`  ) }`            //#.(10901.02.1 RAM Remove trailing app name whatever it may be).(10920.02.2).(10920.05.1)
            FORMRs_4       =    `${ APP_HOME.replace( /[\\/][\w-]+$/,   `/_4/${aFR_fns4s}`  ) }`            // .(10901.02.1 RAM Remove trailing app name whatever it may be).(10920.02.2).(10920.05.1 RAM \w does not include -, as in: 1s-world)

//                             if ( APP_HOME.match(   /_4[\\\/]FR.app02s/ ) ) {                             //#.(10331.02.1 RAM Will we ever get it right).(10920.02.3)
//          FORMRs_4       =    `${ APP_HOME.replace( /_4[\\\/]FR.app02s/,  '_4/FR.fns02s/' ) }` }          // .(10331.02.2).(10403.05.1 RAM I think FORMRs_4 = APP_HOME in this case).(10920.02.4)
            
                               if ( APP_HOME.match(           rFR_app4s   ) ) {                             // .(10331.02.1 RAM Will we ever get it right).(10920.02.3)
            FORMRs_4       =    `${ APP_HOME.replace(         rFR_app4s, `_4/${aFR_fns4s}`  ) }` }          // .(10331.02.2).(10403.05.1 RAM I think FORMRs_4 = APP_HOME in this case).(10920.02.4)

//          FORMRc_4       =        FORMRs_4.replace(         /FR.fns02s/,     'FR.fns02c'  )               //#.(10920.02.5)
            FORMRc_4       =        FORMRs_4.replace(         rFR_fns4s,       aFR_fns4c    )               // .(10920.02.5)

//          FORMRs_4_API   =    `${ FORMRs_4.replace(         /FR.fns02s/,     'FR.app02s'  ) }api`         //#.(10414.01.1 RAM Need this for FormR Auth app).(10920.02.6)
//          FORMRs_4_API   =    `${ sub(     FORMRs_4,        "FR.fns02s",     'FR.app02s'  ) }/api`        //#.(10414.01.1 RAM Need this for FormR Auth app).(10920.02.6)
//          FORMRs_4_API   =    `${ sub(     FORMRs_4,        aFR_fns4s,        aFR_app4s   ) }/api`        //#.(10414.01.1 RAM Need this for FormR Auth app).(10920.02.6)
            FORMRs_4_API   =    `${ FORMRs_4.replace(         rFR_fns4s,        aFR_app4s   ) }/api`        // .(10414.01.1 RAM Need this for FormR Auth app).(10920.02.6)

            APP_HOME_API   =    `${ APP_HOME}/api`; DB_DIR = ''                                             // .(10329.05.7 RAM Ok, Let's prepare for api/DBSN/.. path)
//                                  setEnv( )                                                               // .(10317.03.8 RAM Only necessary if we need process.env vars to be read from .env)
            setEnv( aDirname )                                                                              // .(10403.05.4 RAM Maybe setEnv can be run here, but it is better to run it server.js)
            trace( 'setProjectName'    , 'FormR' )                                                          // .(10301.01.1 RAM Set project name for parsing function call stack).(10405.02.1 RAM Maybe here is good)
            trace( 'setShowTraces'     ,  process.env.DO_TRACING )                                          // .(10303.03.1 RAM Set bQuiet to true if false ).(10405.02.2)

            trace( '       FORMRs_4: .'  +  FORMRs_4.replace( /.+server[0-9]/, '') )                        // .(10920.03.19)
            trace( '       APP_NAME: ./' +  APP_NAME )                                                      // .(10920.03.20)

            } // eif aFilename is the lead Node script

    return  APP_HOME
            } // eof init
//          --------------  =  ----------------------------------------------------

  function  db_logging( pDB, bOn ) {                                                                        // .(10407.01.1 Beg RAM Do db_logging( pDB, 'on|off' ))
            bOn = typeof(bOn) != 'undefined' ? bOn : 'on'
            bOn = `${bOn}`.match(  /on|true|1/i ) ? 1 : 0
        if (typeof(pDB.sequelize.options) == 'undefined') { return }
        if (bOn) {
            pDB.sequelize.options.logging = ( aStr ) => console.log( `  ${aStr}` )
        } else {
            pDB.sequelize.options.logging = ( aStr ) => { var a = aStr }

          } } // eof db_logging                                                                             // .(10407.01.1 End)
//          --------------  =  ----------------------------------------------------

//        (           aFns   => {
//        (         ( aFns ) => {
          ( function( aFns )    {

            init( '' )                                                                                                                                                            // .(10317.03.4 Run setEnv even if ..)

       var  aGlobal = (typeof( window ) == 'undefined') ? 'global' : 'window'
            aFns.split( ' ' ).forEach( g => { eval( aGlobal + '["' + g + '"] = ' + g ) } )
            } )( 'shoRoutes db_logging APP_HOME BRANCH_HOME __dirname __filename' )                         // .(10407.01.2)

//          --------------  =  ----------------------------------------------------

            module.exports =
//           {  shoRoutes  : shoRoutes
             {  help       : shoHelp,     Help: shoHelp                                                     // .(10415.03.1 RAM Add Uppercase)
             ,  init       : init   ,     Init: init                                                        // .(10415.03.2)
             ,  shoModel   : shoModel                                                                       // .(10405.01.1 RAM Added)
             ,  getModel   : getModel                                                                       // .(10405.01.2)
             ,  shoRoutes  : shoRoutes                                                                      // .(10405.01.3)
             ,  setEnv     : setEnv
             ,  sndAPI     : jstFns.sndAPI
             ,  db_logging : db_logging,  DB_LOGGING: db_logging                                            // .(10407.01.3).(10415.03.3)
                }

