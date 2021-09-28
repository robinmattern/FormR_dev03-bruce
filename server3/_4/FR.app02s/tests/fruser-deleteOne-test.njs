       var  FormR           =  require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs`   ) 
            FormR.init( __dirname, __filename ); // FORMR.help()  

//       ----------  =   --------------------------------------------------------

       var  aHost           = `http://localhost:50416`
       var  aRoute2         = '/api/formr/users'
       var  aToken          = ''
       var  nId             =  99 

            jstFns.sndAPI(    'DELETE', `${aHost}${aRoute2}/${nId}`)

// ----- ----------  =    ---------------------------------------------------------

