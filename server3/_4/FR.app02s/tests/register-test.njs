//                    require( `${ process.env.FORMR_HOME }/_3/FR.FNSs/FormR.fns2.3.njs` )  // .Help()
  var FormR        =  require( `${ process.env.FORMR_HOME }/_3/FR.FNSs/FormR.fns.njs`    )  // .Help()  
      FormR.init(   __dirname, __filename )                                                 // .(10403.05.6 RAM Does it need to run FormR and jstFns again?)

      FormR.setEnv( )                                                                       // .(10317.03.8 RAM Only necessary if you need process.env vars to be read from .env)
//                      trace( 'setProjectName', 'FormR' )                                  // .(10301.01.1 RAM Set project name for parsing function call stack)
     
// -------------------------------------------------------------------------------------------------

     var aHost    =  'http://localhost:50717'

     var aRoute   =  '/api/auth/register'

//   var pBody    = { 'username'     : 'robin1',                         // .(10228.06.1 Username already in use)
     var pBody    = { 'username'     : 'robin5',
//                    'email'        : 'robin.mattern@sicomm.net',       // .(10228.06.2 Email already in use)
                      'email'        : 'robin.mattern5@sicomm.net',
                      'password'     : '1234',
//                    'roles'        : [ 'editorx' ]                     // .(10228.06.3 Role does not exist)
//                    'roles'        : [ 'editor'  ]                      

                      'role'         :   'editorx'                       // .(10228.06.3 Role does not exist)
//                    'role'         :   'editor'                        // .(10415.06.3 RAM Submit .role, not .roles)                    
//                    'role'         :   ''                              // .(10415.06.4 RAM Check new default user role)                    
                       }

     var xNext    =    function( pBody ) {
                           console.log( "Register Response", fmtObj( pBody ) );
                           }

         sendAPI( 'POST',  aRoute, pBody, xNext )

// ----- -------- = -- ------------- : -----------------------------------------

function sendAPI( aMethod, aRoute, pBody, xNext  ) { trace( )

     var request  =    require( 'request' );

     var aURL     =    aHost + aRoute

//   var pHeaders = { 'postman-token': '26bcfea0-4a96-fcb3-32b9-2e779288d419',
     var pHeaders = { 'cache-control': 'no-cache',
                      'content-type' : 'application/json' }


     var options  = { 'method'       :  aMethod
                    , 'url'          :  aURL
                    , 'headers'      :  pHeaders
                    , 'body'         :  pBody
                    , 'json'         :  true
                       }

         request( options, onComplete )

//       -------- = -- -------------------------

function onComplete( pError, pResponse, pBody ) {
     if (pError) { throw new Error( pError ); }
       else     { xNext( pBody ) }
         }
//       -------- = -- -------------------------
         } // eof sendAPI
// ----- -------- = -- ------------- : -----------------------------------------

