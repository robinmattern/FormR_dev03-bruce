
if (__filename == process.mainModule.filename) {                                                      // .(10317.04.8 RAM Globals are set in Route.njs)

        pRequest = 
         {  method  : 'get' 
         ,  url     : 'http://localhost:50416/api/formr/users/2' 
            }      
            request( pRequest  ).then(  onSuccess ).catch( onFailure )

   function onSuccess( pBody ) { console.log( "Response:\n", require('util').inspect( pBody, { depth: 99 } ) ) }
   function onFailure( pErr  ) { console.log(  require('util').inspect( pErr ) ) }

      }
//    -----------------------------------------------------------------

//async function request( aMethod, aURL, pData ) {
//      function request( aMethod, aURL, pData ) {
  async function request( pRequest ) {

        var pURL     =  require( 'url' ).parse( pRequest.url );
        var pHTTP    =  require( pURL.protocol == 'https:' ? 'https' : 'http' );

        var pOptions =
             {  method  : pRequest.method.toUpperCase()
             ,  host    : pURL.hostname
             ,  port    : pURL.port || (pURL.protocol == 'https:' ? 443 : 80 )
             ,  path    : pURL.path || "/"
             ,  headers : pRequest.headers || {} 
                }
         
//      --- --------------------------------------------------

     return new Promise( ( resolve, reject ) => {

        var pReq     =  pHTTP.request( pOptions

//      --- ---------------------------------------------

          , function onResponse( pRes ) {

        if (pRes.statusCode < 200 || pRes.statusCode >= 300) {
     return reject( new Error( `Status Code: ${ pRes.statusCode }` ) );
            }
//          ----------------------------------------

        var pResponse =                                     // Response object.
             {  statusCode: pRes.statusCode
             ,  headers:    pRes.headers
             ,  body: [ ]
                };
//          ----------------------------------------

            pRes.on(  'data',     chunk => {
            pResponse.body.push(  chunk ); } );              // Collect response body data.

//          ----------------------------------------

            pRes.on(  'end',  ( )   =>  {

        if (pResponse.body.length) {
            pResponse.body = pResponse.body.join();
      try { pResponse.body = JSON.parse( pResponse.body );
        } catch( pErr ) { }                                 // Silently fail if response is not JSON.
            } // eif pResponse.body.length

                                  resolve( pResponse )
//                                resolve( Buffer.concat( pResponse ).toString( ) ) );
            } ) // eof pRes.on
//          ----------------------------------------
            } ) // eof onResponse  
//      --- ---------------------------------------------

            pReq.on(   "error",   reject );

//      --- --------------------------------------------------

        if (pRequest.data) {
//          pReq.write( String( pRequest.data ) );          //#.(10404.04.7 RAM Why did I put String( aObject )?)
        var aData = (typeof( pRequest.data) == 'object')    // .(10404.04.7 RAM Cuz it has to be a string)
          ?  JSON.stringify( pRequest.data )                // .(10404.04.8 RAM is the Content.length header correct?) 
          :          String( pRequest.data )
            pReq.write(  aData );                           // send POST or PUT data 
            }
//          ----------------------------------------

            pReq.end( );

            } ) // eof new Promise
//          --------------------------------------------------
      } // eof request
//    -----------------------------------------------------------------

module.exports = request


