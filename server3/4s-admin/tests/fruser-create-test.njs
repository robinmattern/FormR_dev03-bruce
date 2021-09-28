
       var FormR     =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
           FormR.init( __dirname, __filename );         FormR.help(); process.exit()                                // .(10829.01.3)

//       ----------  =   --------------------------------------------------------

       var  aHost           = `http://localhost:50353`
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
