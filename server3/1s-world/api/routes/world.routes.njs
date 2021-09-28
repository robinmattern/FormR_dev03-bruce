//      --------------------------------------------------------------------------------------------------

//          FormR       =  require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
            FormR       =  require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
            FormR.init(  __dirname, __filename );       //  FormR.help(); process.exit()                                    

//          FormR.setEnv( )                                                                                 // .(10317.03.8 RAM Only necessary if you need process.env vars to be read from .env)
            FormR.setEnv( )                                                                                 // .(10414.02.12 RAM Necesary here because we are setting up a new DB)
 
//      --------------------------------------------------------------------------------------------------

     var  { getControllers }    =  require( `${FORMRs_4}/controller.fns.njs`  ).fns                         // .(10327.04.5 RAM Was: `${APP_HOME}/api/Controllers/_controller.fns.njs`)    
     var  { getAppRoutes   }    =  require( `${FORMRs_4}/route.fns.njs`       ).fns                         // .(10327.04.6 RAM Was: `${APP_HOME}/api/Controllers/_controller.fns.njs`)    

// --------------------------------------------------------------

                                   trace(  "module.exports" )

     module.exports             =  getWorldRoutes()                                          // .(10404.06.1)

// ---------------------------------------------------------------------------------------------------------------------

   function getWorldRoutes(  ) { trace( )                                                    // .(10404.06.2 RAM Return pRouter for World Tables)

//          -------------------------------------------------------------------------------- // .(10404.06.3 RAM Beg May not be needed)

   const    setHeader = function( req, res, next ) {                                         // .(10227.05.2 RAM Beg Moved to be a function)
            res.header(
                'Access-Control-Allow-Headers',
                'x-access-token, Origin, Content-Type, Accept'
                 );
            next();  // [authJwt.verifyToken]
            };                                                                               // .(10227.05.2 End)

        var pRouter             =  require( 'express').Router()                              // .(10313.01.3)

            pRouter.use(        setHeader )                                                  // .(10404.06.3 End)

//          --------------------------------------------------------------------------------

            pTableRoutes        =  {}                                                        // .(10319.05.x RAM Create new set of pTableRoutes
            pTableRoutes        =  getModelRoutes( 'city, country' )                         // .(10404.06.8 RAM Get/Add World Tables to pTableRoutes)

            pRouter.use(           getAppRoutes( pTableRoutes ) )                            // .(10404.06.9 Create and set Express routes for World tables) 

//          --------------------------------------------------------------------------------

     return pRouter
            };                                                                               // .(10313.01.2 End)
// -------------------------------------------------------------------------------------------------

   function getModelRoutes( aModels ) { trace( aModels )

            pTableRoutes = { }

            aModels.split( /[, ]+/ ).forEach( function getControllerRtes( aModel ) {
               getControllers( aModel, aShowEm )
               } )

     return pTableRoutes

            } // eof getModelRoutes
//          ------------------------------------------------------

          nDoTests        =   1

      if (doTest( 1, __filename )) {   // Format and possible redefine Controllers and Routes in pTableRoutes

            shoRoutes( module.exports )
            }
//    ---   ------------------------------------------------------------------

