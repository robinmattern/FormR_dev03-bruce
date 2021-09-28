// -- -----------------------------------------------------------------------------------------------

//          FormR    =   require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
       var  FormR    =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
            FormR.init(__dirname, __filename );       //  FormR.help(); process.exit()                                    

//     ------------  =   --------------------------------------------------------

//          FormR.setEnv( )                                                             // .(10317.03.8 RAM Only necessary if you need process.env vars to be read from .env).(10922.03.1 RAM is run in FormR.init())

// -- -----------------------------------------------------------------------------------------------

       var  pExpress    =  require( 'express'       );
       var  pCORS       =  require( 'cors'          );

//                         trace( 'setProjectName', 'FormR' )                         // .(10301.01.1 RAM Set project name for parsing function call stack).(10405.02.3 RAM Move to Init)
//                         trace( 'setShowTraces' ,  process.env.DO_TRACING )         // .(10303.03.1 RAM Set bQuiet to true if false ).(10405.02.4)
                           trace( "Begin" )                                           // .(10305.03.1)

// -- -----------------------------------------------------------------------------------------------

       var  pApp        =  pExpress()                                                   // .(10303.01.2)

            pApp.use(      pCORS( { origin: process.CORS_CLIENT_URL } ) );              // Allow for cross-origin client apps // .(10315.04.3 RAM Saved as RegEx in setEnv)

            pApp.use(      pExpress.json() );                                           // Parse requests of content-type - application/json .(10315.01.1 Was: pBodyParser.json())
            pApp.use(      pExpress.urlencoded( { extended: true } ) );                 // Parse requests of content-type - application/x-www-form-urlencoded  .(10315.01.1 Was: pBodyParser.urlencoded( { extended: true } ))

//    -----------------------------------------------------------------------------

            pApp.get( '/', sndRoot_Welcome )                                            // Executes the callback controller only for the path '/')

//          pApp.use(      require( './api/routes/routes.njs' ) )                       // .(10314.03.1 RAM Didn't get updated to The new, cleaner, way to set Routes)
            pApp.use(      require( './api/routes/index.njs' ) )                        // .(10314.03.1 RAM Didn't get updated to The new, cleaner, way to set Routes).(10405.03.1 RAM Combine multiple routes)

            pApp.use(      sndError_InvalidRoute  )                                     // .(10124.01.4 RAM Finally, send error if all routes fail)

            bDoSeqSync  = `${ process.env.DO_SYNC }`.match( /true|1/i ) != null  // .(10327.02.1 RAM Put option into .env)
        if (bDoSeqSync) {  require( './api/models/index.js' ).sequelize.sync(); }       // .(10327.02.2 RAM Initializes tables and test data if necessary))

                           shoRoutes( pApp, process.env.SHOW_ROUTES )
//                         FormR.help( 'vars' )

//    -----------------------------------------------------------------------------

       var  nPort       =  process.env.PORT || 8080;

            pApp.listen(   nPort, shoServer_Start  )                                   // set port, listen for requests

// -- -----------------------------------------------------------------------------------------------

  function  shoServer_Start( ) {
            console .log( `\n  The Express Server in ${APP_NAME} is accessible at: http://localhost:${nPort}.\n` );
            } // eof showServer_Start
//          ----------------------------------------------

  function  sndRoot_Welcome( req, res, next ) { trace()                                // .(10218.05.1 RAM Simplest route )
       var  aURL     =  req.originalUrl || ''
        if (aURL == '/') {
            res.send(  `  Welcome to the /${process.env.APP_NAME} application.` )       // .(10218.05.2 RAM It was silent with response below)
   } else { next() }
            } // eof sendRoot_Welcome
//          ----------------------------------------------

  function  sndError_InvalidRoute( req, res ) {                                        // .(10124.01.5 RAM Beg: Write sendError_InvalidRoute)
       var  aURL     =  req.originalUrl || ''
       var  aMethod  =  req.method;       trace( `${aMethod} ${aURL}` )                 // .(10227.09.4 RAM)
       var  aMsg     = `Invalid route: ${aMethod} ${aURL}`;
            res.status(404).send( `server.js 404: ${aMsg}` );                           // .(10210.06.1 RAM Get it right).(10227.08.2 Hard code server.js[91])
            } // eof sendError_InvalidRoute                                             // .(10124.01.5 RAM End)
//          ----------------------------------------------
// -- -----------------------------------------------------------------------------------------------

