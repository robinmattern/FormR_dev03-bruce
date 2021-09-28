
//          FormR    =   require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
       var  FormR    =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
            FormR.init(__dirname, __filename );       //  FormR.help(); process.exit()

//     ------------  =   --------------------------------------------------------

       var  aRoute2         = '/api/formr/roles'

       var  aHost           = `http://localhost:50353`

       var  aArgs           = '?filter={}&range=[0,9]&sort=["id","ASC"]'

       var  pData1 =
             {  name        : 'swimmer'
             ,  updatedAt   :  new Date
             ,  createdAt   :  new Date
                }

       var  pData2 =
             {  name        : 'swimmer2'
             ,  updatedAt   :  new Date
                }

//   doit = async function ( )    { ... }; doit( )
//  ; (     async function ( )    { ... }     )( )
    ; (     async          ( ) => {

       var  nId = ( await  jstFns.sndAPI( 'POST',  `${aHost}${aRoute2}`, pData1 ) ).body.id  // C reate a rec
                    await  jstFns.sndAPI( 'GET',   `${aHost}${aRoute2}`, aArgs  )            // R ead 10 recs
                    await  jstFns.sndAPI( 'PUT',   `${aHost}${aRoute2}/${nId}`, pData2 )     // U pdate a rec
                    await  jstFns.sndAPI( 'DELETE',`${aHost}${aRoute2}`, nId    )            // D elete a red

                           jstFns.sndAPI( 'GET',   `${aHost}${aRoute2}`, nId    )            // R ead one rec
                           } )( )

// ----- ----------  =    ---------------------------------------------------------

