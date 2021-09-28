
//       FormR     =   require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
     var FormR     =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
         FormR.init( __dirname, __filename );       //  FormR.help(); process.exit()                                    

                        trace( 'setProjectName', 'FormR' )                           // .(10301.01.1 RAM Set project name for parsing function call stack)

     var aHost    =  'http://localhost:50353'

     var aRoute   =  '/api/rauth/register'                               // .(10909.01.6)

//   var pBody    = { 'username'     : 'robin1',                         // .(10228.06.1 Username already in use)
     var pBody    = { 'username'     : 'robin4',
//                    'email'        : 'robin.mattern@sicomm.net',       // .(10228.06.2 Email already in use)
                      'email'        : 'robin3.mattern@sicomm.net',
                      'password'     : '1234',
//                    'roles'        : [ 'editorx' ]                     // .(10228.06.3 Role does not exist
                      'roles'        : [ 'editor'  ]                      
                       }

     var xNext    =    function( pBody ) {
                           console.log( "Signup Response", fmtObj( pBody ) );
                           }

         sendAPI( 'POST',  aRoute, pBody, xNext )

// ----- -------- = -- ------------- : -----------------------------------------

function sendAPI( aMethod, aRoute, pBody, xNext  ) { trace( )

     var request  =    require( 'request' );

     var aURL     =    aHost + aRoute

     var pHeaders = { 'postman-token': '26bcfea0-4a96-fcb3-32b9-2e779288d419',
                      'cache-control': 'no-cache',
                      'content-type' : 'application/json' }


     var options  = { 'method'       :  aMethod,
                      'url'          :  aURL,
                      'headers'      :  pHeaders,
                      'body'         :  pBody,
                      'json'         :  true
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

