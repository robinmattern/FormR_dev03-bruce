
//          FormR    =   require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
       var  FormR    =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
            FormR.init(__dirname, __filename );       //  FormR.help(); process.exit()                                    

//     ------------  =   --------------------------------------------------------

       var  aHost           = `http://localhost:50416`
       var  aRoute2         = '/api/formr/users'
       var  aToken          = ''
       var  nId             =  99 

            jstFns.sndAPI(    'DELETE', `${aHost}${aRoute2}/${nId}`)

// ----- ----------  =    ---------------------------------------------------------

