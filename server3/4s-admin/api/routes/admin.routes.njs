//      --------------------------------------------------------------------------------------------------

//          FormR    =   require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
       var  FormR    =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
            FormR.init(__dirname, __filename );       //  FormR.help(); process.exit()

//   --------------  =   --------------------------------------------------------

     var  { getControllers }    =  require( `${FORMRs_4}/controller.fns.njs`  ).fns          // .(10327.04.5 RAM Was: `${APP_HOME}/api/Controllers/_controller.fns.njs`)
     var  { getAppRoutes   }    =  require( `${FORMRs_4}/route.fns.njs`       ).fns          // .(10327.04.6 RAM Was: `${APP_HOME}/api/Controllers/_controller.fns.njs`)

// --------------------------------------------------------------

                                   trace(  "module.exports" )

     module.exports             =  getAuthRoutes()                                           // .(10313.01.1)

// --------------------------------------------------------------

   function getAuthRoutes(  ) { trace( )                                                     // .(10313.01.2 Beg RAM Return pRouter for pApp.use( pRouter ))

   const    setHeader = function( req, res, next ) {                                         // .(10227.05.2 Beg RAM Moved to be a function)
            res.header(
                'Access-Control-Allow-Headers',
                'x-access-token, Origin, Content-Type, Accept'
                 );
            next();  // [authJwt.verifyToken]
            };                                                                               // .(10227.05.2 End)

        var pRouter          =  require( 'express').Router()                                 // .(10313.01.3)

            pRouter.use(        setHeader )

//          --------------------------------------------------------------------------------









//          --------------------------------------------------------------------------------
                                                                                             // .(10917.01.1 Beg RAM Move to admin.routes.njs)
   const    pUserControllers =  require( '../controllers/fruser.controllers.njs' );          // .(10319.05.2).(10328.06.2).(10331.03.2 RAM Changed file name)
   const    pRoleControllers =  require( '../controllers/frrole.controllers.njs' );          // .(10319.05.3).(10328.06.3).(10331.03.3).(10917.04.1 RAM Not used in app3s)

            pTableRoutes     =  getControllers( pUserControllers, aShowEm )                  // .(10319.05.4).(10921.05.1 RAM Added aShowEm)
            pTableRoutes     =  getControllers( pRoleControllers, aShowEm )                  // .(10319.05.6).(10917.04.1).(10921.05.2m)

            pRouter.use(        getAppRoutes( pTableRoutes ) )                               // .(10319.05.7)

//          --------------------------------------------------------------------------------
                                                                                             // .(10917.01.1 End)










     return pRouter
            };                                                                               // .(10313.01.2 End)
// -------------------------------------------------------------------------------------------------

          nDoTests        =   1

      if (doTest( 1, __filename )) {   // Format and possible redefine Controllers and Routes in pTableRoutes

            shoRoutes( module.exports )
            }
//    ---   ------------------------------------------------------------------

