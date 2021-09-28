
//          FormR    =   require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
       var  FormR    =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
            FormR.init(__dirname, __filename );        // FormR.help('all'); process.exit()                                    

//     ------------  =   --------------------------------------------------------

       var  aHost           = `http://localhost:50353`
       var  aRoute2         = '/api/formr/users'
       var  aData           = '?filter={}&range=[0,9]&sort=["id","ASC"]'
       var  aToken          = '' 

            bQuiet          =  false 

//          jstFns.sndAPI(    'GET', `${aHost}${aRoute2}`, aData, aToken, onComplete )
//          jstFns.sndAPI(    'GET', `${aHost}${aRoute2}`, aData )
            jstFns.sndAPI(    'GET', `${aHost}${aRoute2}`, aData,   '',   onComplete )
//          jstFns.sndAPI(    'GET', `${aHost}${aRoute2}`  )

  function  onComplete(  pError, pData, aURL ) {
       var  bBefore   =  aURL  ? true : false, bAfter = ! bBefore, nRecs = pData.body ? pData.body.length : 0

        if (bBefore                 ) { console.log( " Request URL:\n     " +       aURL               ) }
        if (bBefore && pError       ) { console.log( " Request Headers:"  + fmtObj( pError,        6 ) ) }
        if (bBefore && pData        ) { console.log( " Request Data:"     + fmtObj( pData ,        6 ) ) }

        if (bAfter  && pError       ) { console.log( " Response Error:"   + fmtObj( pError,        6 ) ) }
        if (bAfter  && pData.headers) { console.log( " Response Headers:" + fmtObj( pData.headers, 6 ) ) }
        if (bAfter  && pData.body   ) { console.log( ` Response Body (${ nRecs }):${ fmtObj( pData.body[0]        , 6 ) }`) 
                                        console.log(               `     ...      ${ fmtObj( pData.body[nRecs - 1], 6 ) }`) };    // .(10830.03.2 RAM )

            }
// ----- ----------  =    ---------------------------------------------------------

