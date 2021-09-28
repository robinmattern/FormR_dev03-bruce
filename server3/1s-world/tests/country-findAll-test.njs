 //         FormR    =   require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
       var  FormR    =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
            FormR.init(__dirname, __filename );       //  FormR.help(); process.exit()                                    

//     ------------  =   --------------------------------------------------------

       var  aRoute          = '/api/world/countries'
       var  aHost           = `http://localhost:50882`

       var  aData           = '?filter={}&range=[10,19]&sort=["code","ASC"]'  // Case doesn't seem to matter 
       var  pData1          =  { Code: 'AAA', Name: "AAA Country" }           // Unique Primary Key needs to be part of new data isno Auto-Increment
       var  pData2          =  {              Name: "AAB Country" }           // Case is important
//     var  pData2          =  { Code: 'AAA', Name: "AAC Country" }           // Primary Key should not be part of updated data 

//          jstFns.sndAPI(    'GET',    `${aHost}${aRoute}`       )
//          jstFns.sndAPI(    'GET',    `${aHost}${aRoute}/USA`   )
            jstFns.sndAPI(    'GET',    `${aHost}${aRoute}`,      aData  )
//          jstFns.sndAPI(    'POST',   `${aHost}${aRoute}`,      pData1 )
//          jstFns.sndAPI(    'PUT',    `${aHost}${aRoute}/AAA`,  pData2 )
//          jstFns.sndAPI(    'DELETE', `${aHost}${aRoute}/AAA`   )

// ----- ----------  =    ---------------------------------------------------------

