
//       FormR     =   require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
     var FormR     =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
         FormR.init( __dirname, __filename );       //  FormR.help(); process.exit()                                    

//   ------------  =   --------------------------------------------------------
                         trace( 'setProjectName', 'FormR' )                           // .(10301.01.1 RAM Set project name for parsing function call stack)

     var aHost    =  'http://localhost:50716'

     var aRoute   =  '/api/rauth/login'                                               // .(10909.01.5)

     var pBody    = { 'username'     : 'robin1',
                      'password'     : '1234',
                       }

     var onResponse =  function( pBody ) {
                           console.log( "Signin Response", fmtObj( pBody ) ); 
                           }


        sendAPI( 'POST', aRoute, pBody, onResponse )

// ----- -------- = -- ------------- : -----------------------------------------

function sendAPI( aMethod, aRoute, pBody, xNext  ) {

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

