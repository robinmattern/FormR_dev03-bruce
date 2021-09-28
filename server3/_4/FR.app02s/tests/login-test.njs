//                    require( `${ process.env.FORMR_HOME }/_3/FR.FNSs/FormR.fns2.3.njs` )  // .Help()
  var FormR        =  require( `${ process.env.FORMR_HOME }/_3/FR.FNSs/FormR.fns.njs`    )  // .Help()  
      FormR.init(   __dirname, __filename )                                                 // .(10403.05.6 RAM Does it need to run FormR and jstFns again?)

//    FormR.setEnv( )                                                                       // .(10317.03.8 RAM Only necessary if you need process.env vars to be read from .env)
// ----- -------- = -- ------------- : -----------------------------------------

     var aHost    =  'http://localhost:50717'

     var aRoute   =  '/api/auth/login'

     var pBody    = { 'username'     : 'robin2',
                      'password'     : '1234',
                       }

     var onResponse =  function( pBody ) {
                           console.log( "Login Response", fmtObj( pBody ) ); 
                           }


        sendAPI( 'POST', aRoute, pBody, onResponse )

// ----- -------- = -- ------------- : -----------------------------------------

function sendAPI( aMethod, aRoute, pBody, xNext  ) {

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

