

//request( 'get', "google.com"                             ).then(  onSuccess ).catch( onFailure )
  request( 'get', "http://localhost:50416/api/formr/users" ).then(  onSuccess ).catch( onFailure )

   function onSuccess( pBody ) { console.log( "response", pBody ) }
   function onFailure( pErr  ) { console.log( "error",    pErr  ) }

//    -----------------------------------------------------------------

async function request( aMethod, aURL, pData ) {

        var pURL     =  require( 'url' ).parse( aURL );
        var pHTTP    =  require( pURL.protocol == 'https:' ? 'https' : 'http' );

        var pOptions =
             {  method  : aMethod.toUpperCase()
             ,  host    : pURL.hostname
             ,  port    : pURL.port || (pURL.protocol == 'https:' ? 443 : 80 )
             ,  path    : pURL.path || "/"
                }
//          -----------------------------------------

     return new Promise( ( resolve, reject ) => {

        var pReq     =  pHTTP.request( pOptions, onResponse )
            pReq.on(   "error", reject );
        if (pData) {
            pReq.write( pData );
            }
            pReq.end( );

            } ) // eof new Promise
//          -----------------------------------------

   function onResponse( pRes, resolve ) {

        if (pRes.statusCode < 200 || pRes.statusCode >= 300) {
     return reject( new Error( `Status Code: ${pRes.statusCode}` ) );
            }
        var mRes     = [];
            pRes.on( "data", chunk => { mRes.push( chunk ); });
            pRes.on( "end",  ( )   =>   resolve( Buffer.concat( mRes ).toString( ) ) );

            } // eof onResponse
//          -----------------------------------------

      } // eof request
//    -----------------------------------------------------------------