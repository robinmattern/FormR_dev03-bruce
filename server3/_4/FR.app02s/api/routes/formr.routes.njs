//      --------------------------------------------------------------------------------------------------

//          FormR           =  require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
        var FormR           =  require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
            FormR.init(      __dirname, __filename );       //  FormR.help(); process.exit()                                    

//          FormR.setEnv( )                                                                  // .(10317.03.8 RAM Only necessary if you need process.env vars to be read from .env)
            FormR.setEnv( )                                                                  // .(10414.02.12 RAM Necesary here because we are setting up a new app)
     
// -------------------------------------------------------------------------------------------------

     var  { getControllers }    =  require( `${FORMRs_4}/controller.fns.njs` ).fns           // .(10327.04.5 RAM Was: `${APP_HOME}/api/Controllers/_controller.fns.njs`)    
     var  { getAppRoutes   }    =  require( `${FORMRs_4}/route.fns.njs`      ).fns           // .(10327.04.6 RAM Was: `${APP_HOME}/api/Controllers/_controller.fns.njs`)    

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

// const    pControllers     =  require( '../controllers/auth.controllers.njs' ).Controllers //#.(10227.04.1 RAM)
// const    pAuthControllers =  require( `${FORMRs_4}/FMR_auth.controllers.njs`);            //#.(10319.05.1)
   const    pAuthControllers =  require( `../controllers/frauth.controllers.njs` );          // .(10328.06.1 RAM Back to being a normal app).(10331.03.1)

            pTableRoutes     =  {}                                                           // .(10319.05.x RAM Create new set of pTableRoutes
            pTableRoutes     =  getControllers( pAuthControllers )                           // .(10319.05.5)

//          pRouter.use(        getAppRoutes( getControllers( pAuthControllers ) ) )         //#.(10319.05.5)

//          delete pTableRoutes.auth[ 'http.post    /api/auth/register/             ' ]      // .(10313.03.2 RAM We don't want to set auth.routes again)
//          delete pTableRoutes.auth[ 'http.post    /api/auth/login/                ' ]      // .(10313.03.3 RAM in where ?? )
            delete pTableRoutes[AUTH][`http.post    /api/${AUTH}/register/`.padEnd( TheRouteWdt ) ] // .(10330.08.1 RAM Should it 'auth' or 'formr'?).(10331.04.2)
            delete pTableRoutes[AUTH][`http.post    /api/${AUTH}/login/   `.padEnd( TheRouteWdt ) ] // .(10330.08.2).(10331.04.3)

//          --------------------------------------------------------------------------------

//          pTableRoutes     =  getModelRoutes( 'user, role' )  

// const    pUserControllers =  require( `${FORMRs_4}/FMR_user.controllers.njs` );           // .(10319.05.2)
// const    pRoleControllers =  require( `${FORMRs_4}/FMR_role.controllers.njs` );           // .(10319.05.3)
   const    pUserControllers =  require( '../controllers/fruser.controllers.njs' );          // .(10319.05.2).(10328.06.2).(10331.03.2 RAM Changed file name)
   const    pRoleControllers =  require( '../controllers/frrole.controllers.njs' );          // .(10319.05.3).(10328.06.3).(10331.03.3)

//          pTableRoutes     =  {}                                                           // .(10319.05.x RAM Add more routes to pTableRoutes)
            pTableRoutes     =  getControllers( pUserControllers )                           // .(10319.05.4)
            pTableRoutes     =  getControllers( pRoleControllers )                           // .(10319.05.6)

//     var  pAppRoutes   = pFns.getAppRoutes( pTableRoutes )                                 //#.(10313.01.4 RAM Maybe later)
//          pRouter.use(        getAppRoutes( getControllers( pUserControllers ) ) )         //#.(10319.05.4)
            pRouter.use(        getAppRoutes( pTableRoutes ) )                               // .(10319.05.7)

//          --------------------------------------------------------------------------------

// const    verifySignUp     =  require( `${APP_HOME}/api/Middleware/verifySignUp.js`  );    //#.(10227.03.1 RAM).(10338.06.2) 
   const    verifySignUp     =  require(              '../Middleware/verifySignUp.js'  );    // .(10328.06.2 RAM Back to being a normal app)

            pRouter.post( `/api/${AUTH}/register`, [ verifySignUp.checkDuplicateUsernameOrEmail // .(10330.08.3)
                                                 ,   verifySignUp.checkRolesExisted ]
                                                 ,   pAuthControllers.Controllers.register );   // .(10227.04.1 RAM WAS controller).(10228.12.06).(10319.05.8 RAM Just the one controller)

            pRouter.post( `/api/${AUTH}/login`   ,   pAuthControllers.Controllers.login    );   // .(10228.12.07).(10319.05.9).(10330.08.4) 

//          --------------------------------------------------------------------------------

     return pRouter
            };                                                                               // .(10313.01.2 End)
// -------------------------------------------------------------------------------------------------

          nDoTests        =   1

      if (doTest( 1, __filename )) {   // Format and possible redefine Controllers and Routes in pTableRoutes

            shoRoutes( module.exports )
            }
//    ---   ------------------------------------------------------------------

