//          require( `${__dirname}/JScripts2.3.njs` )
   jstFns = require( './JScripts_u2.5.njs' ); // jstFns.help(); process.exit()

       var  aURL     =  'http://localhost:50881/api/formr/users/90'

            nDoTests = 4

        if (doTest(  1, __filename )) {
//          -------  =  ---------------------------------------------

//          sndAPI_1( 'GET', aURL )
            sndAPI_2( 'GET', aURL )
            }

        if (doTest(  2, __filename )) {
//          -------  =  ---------------------------------------------

//          sndAPI_2( 'PUT', aURL, aToken,  pUserData, onUpdate    )
            }

        if (doTest(  3, __filename )) {
//          -------  =  ---------------------------------------------

     jstFns.sndAPI(   'GET',  aURL )                            // .(10607.01.1 RAM jstFns.sndAPI does what sndAPI_1 and sndAPI_2 does)
            }

        if (doTest(  4, __filename )) {
//          -------  =  ---------------------------------------------

            bQuiet   =  true
        var doGetAPI =  async function( ) {
        var pData    =  await jstFns.sndAPI( 'GET', aURL )      // .(10607.01.2 RAM jstFns.sndAPI also supports await)
            console.log( "pData: ", pData.body )
            }

            doGetAPI()
//          -------  =  ---------------------------------------------
            }
// ----- ----------  =    ---------------------------------------------------------

  function  sndAPI_2( aMethod, aURL, aToken, pData,    xNext ) {
       var  xAJAX2 =  require( './request3.njs' )
            sndAPI(   aMethod, aURL, aToken, pData,    xNext )
            onSubmit( aMethod, aURL, pData,  pHeaders, xNext )
            xAJAX2(   aMethod, aURL, pData,  pHeaders, xNext )
               .then( onSuccess ).catch( onFailure )
            }
// ----- ----------  =    ---------------------------------------------------------

  function  sndAPI_1( aMethod, aURL, aToken, pData,    xNext ) {
       var  xAJAX1 =  require( 'request' ), pRequest
       var  pRequest= sndAPI(   aMethod, aURL, aToken, pData, xNext )
            onSubmit( pRequest )
            xAJAX1(   pRequest,  onComplete )
            }
// ----- ----------  =    ---------------------------------------------------------

  function  sndAPI(   aMethod, aURL, aToken, pData,    xNext ) {

            pHeaders = { 'cache-control'  : 'no-cache' }

        if (aToken) {
            pHeaders[    'x-access-token' ] = aToken
            }
        if (aMethod.match( /GET|DELETE/i  ) ) {
            aURL     =   `${aURL}/${pData ? pData : ''}`
            bJSON    =    false
            pBody    =   ''
            }
        if (aMethod.match( /POST|PUT/i ) ) {
            pHeaders[    'content-type' ]    = 'application/json'
            bJSON    =    true
            }
        if (aMethod.match( /PUT/i ) ) {
            aURL     =   `${aURL}/${pData.id}`
            delete        pData.id
            }
     return pRequest =
             {  method          :  aMethod
             ,  url             :  aURL
             ,  headers         :  pHeaders
             ,  body            :  pData
             ,  json            :  bJSON
                }
//          -------  =   ---------------------
         } // eof sndAPI
//       ----------  =   ----------------------------

  function  onSubmit( aMethod, aURL, pData, pHeaders, xNext ) {
        if (typeof(xNext) != 'function') {
            console.log( " Request.url:\n    ",     `${ aMethod } ${ aURL }` );
        if (pHeaders) {
            console.log( " Request.headers:",   fmtObj( pHeaders, 6 ) ); }
        if (pData) {
            console.log( " Request.body:",      fmtObj( pData, 6 ) ); }
        } else {
            xNext( pRequest.headers, pRequest.body, `${ pRequest.method} ${pRequest.url}` )
            }
        }
//      -----------  =   ----------------------------

  function  onSuccess( pResponse ) {
        if (typeof(xNext) != 'function') {

        if (pResponse.headers) {
            console.log( "Response.headers", fmtObj( pResponse.headers ) );
            }

       var  aBody    =   (typeof( pResponse.body ) != 'string') ? fmtObj( pResponse.body ) : pResponse.body.replace( /[\\]+/g, '\\' )
            console.log( "Response.body",    aBody );

        } else {
            xNext( { }, pResponse.body, '' ) }
            } // eof onSuccess
//      -----------  =   ----------------------------

  function  onFailure(  pError ) {
        if (typeof(xNext) != 'function') {
            throw new Error( pError );
            }  xNext( pError, { }, '' )
            }  // eof onFailure
//      -----------  =   ----------------------------

  function  onComplete( pError, pResponse, pBody ) {
        if (typeof(xNext) != 'function') {
        if (pError) { onFailure( pError )
        } else      { onSuccess( pResponse.body, pResponse ) }
        } else xNext( pError, pBody, '' )
            }  // onComplete
//      -----------  =   ----------------------------



