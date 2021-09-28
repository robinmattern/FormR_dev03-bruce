       
                                       process.env.FORMR_HOME = __dirname.replace( /[\\\/](serv|clie).+/, '')   // .(10829.01.1 RAM)
//          FormR    =   require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
       var  FormR    =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
            FormR.init(__dirname, __filename );       //  FormR.help(); process.exit()                                    

//     ------------  =   --------------------------------------------------------

       var  aHost           = `http://localhost:50416`
       var  aRoute2         = '/api/formr/users'
       var  aToken          = ''
       var  nId             =  2  

            jstFns.sndAPI(    'GET', `${aHost}${aRoute2}`, nId, aToken, onComplete )
//          jstFns.sndAPI(    'GET', `${aHost}${aRoute2}`, nId  )
//          jstFns.sndAPI(    'GET', `${aHost}${aRoute2}/${nId}`)

  function  onComplete(  pError, pData, aURL ) {
       var  bBefore   =  aURL  ? true : false, bAfter = ! bBefore

        if (bBefore                 ) { console.log( " Request URL:\n     " +       aURL               ) }
        if (bBefore && pError       ) { console.log( " Request Headers:"  + fmtObj( pError,        6 ) ) }
        if (bBefore && pData        ) { console.log( " Request Data:"     + fmtObj( pData ,        6 ) ) }

        if (bAfter  && pError       ) { console.log( " Response Error:"   + fmtObj( pError,        6 ) ) }
        if (bAfter  && pData.body   ) { console.log( " Response Body:"    + fmtObj( pData.body,    6 ) ) }
        if (bAfter  && pData.headers) { console.log( " Response Headers:" + fmtObj( pData.headers, 6 ) ) }
            }
// ----- ----------  =    ---------------------------------------------------------

