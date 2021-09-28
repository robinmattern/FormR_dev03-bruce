            require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns2.4.njs` ) // .Help()
              trace( 'setProjectName', 'FormR' )                           // .(10301.01.1 RAM Set project name for parsing function call stack)

       var  aHost    =  'http://localhost:50881'

       var  aRoute1  =  '/api/auth/login'
       var  aRoute2  =  '/api/users/admin'                                 // .(10311.04.1 RAM Was: api/test/..) 
       var  aRoute2  =  '/api/users/editor'                                // .(10311.04.2)    
//     var  aRoute2  =  '/api/users/user'                                  // .(10311.04.3) 
       var  aRoute2  =  '/api/auth/session'                                // .(10311.07.2).(10406.03.1 RM Was: /api/users/session)    

       var  pBody    = { 'username' : 'admin',  'password' : '12345678' }
                          
//     var  pBody    = { 'username' : 'robinx', 'password' : ''         }  // Invalid Password
//     var  pBody    = { 'username' : 'robinx', 'password' : 'sdf'      }  // Invalid user
//     var  pBody    = { 'username' : 'robin1',                            // Not an admin or editor, but is a user 
//     var  pBody    = { 'username' : 'robin1', 'password' : '1234x'    }  // Invalid password 
//     var  pBody    = { 'username' : 'robin1', 'password' : '1234'     }  // Valid password 
//                        }

            sendAPI( 'POST', aRoute1, pBody, '', onLogin )

  function  onLogin(  pBody ) {
            console.log( "Login Response", fmtObj( pBody ) ); 

//      if (pBody.message.match( /User Not Found|Invalid Password/i )) { return }
      if (! pBody.accessToken) { return }

            sendAPI( 'GET',  aRoute2, '', pBody.accessToken, onAuth  )
            }

  function  onAuth(   pBody ) {
            console.log( "Session Response",  fmtObj( pBody ) ); 
            }


// ----- -------- = -- ------------- : -----------------------------------------

  function  sendAPI( aMethod, aRoute, pBody, aToken, xNext  ) {

       var  request  =  require( 'request' );

       var  aURL     =  aHost + aRoute

       var  pHeaders = { 'postman-token'  : '26bcfea0-4a96-fcb3-32b9-2e779288d419',
                         'cache-control'  : 'no-cache',
                         'content-type'   : 'application/json' }
        if (aToken) { 
            pHeaders[    'x-access-token' ] = aToken
            }                  

       var  options  = { 'method'         :  aMethod,
                         'url'            :  aURL,
                         'headers'        :  pHeaders,
                         'body'           :  pBody,
                         'json'           :  true
                          }

            request( options, onComplete )

//       -------- = -- -------------------------
         
  function  onComplete( pError, pResponse, pBody ) {
        if (pError) { throw new Error( pError ); }
          else     { xNext( pBody ) }
            }        
//       -------- = -- -------------------------
         } // eof sendAPI 
// ----- -------- = -- ------------- : -----------------------------------------
