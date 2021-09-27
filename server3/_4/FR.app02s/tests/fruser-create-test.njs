       var  FormR           =  require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs`   ) 
            FormR.init( __dirname, __filename ); // FORMR.help()  

//       ----------  =   --------------------------------------------------------

       var  aHost           = `http://localhost:50416`
       var  aRoute2         = '/api/formr/users'
       var  aToken          = ''
//     var  nId             = ''  

       var  pData =

             {  username    : 'robin94'
             ,  email       : 'suzee.parker94@gmail.com'
             ,  group       : 'Dept34' 
             ,  password    : '1234'
             ,  active      : 'Yes'
             ,  role        : 'User'
             ,  passworddate:  addDate( 90 )
             ,  updatedAt   :  new Date 
//           ,  createdAt   : '2021-03-15T20:31:02.000Z'
                }

            jstFns.sndAPI(    'POST', `${aHost}${aRoute2}`, pData, aToken )

// ----- ----------  =    ---------------------------------------------------------

  function  addDate( n, d )  { return  fmtDate( 6, d, n ).substr( 0, 10 ) }    // .(10314.06.1 RAM Use fmtDate)
