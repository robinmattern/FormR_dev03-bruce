//          FormR    =   require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
       var  FormR    =   require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
            FormR.init(__dirname, __filename );        // FormR.help('all'); process.exit()                                    

//     ------------  =   --------------------------------------------------------

       var  aHost    = `http://localhost:50371`

//          nDoTests =  1   // 1. Check if '/api/world/cities/model'   -> city.controllers.getModel works
//          nDoTests =  2   // 2. Check if '/api/world/cities/4080'    -> city.controllers.findOne works
//          nDoTests =  3   // 3. Check if '/api/world/cities'         -> city.controllers.findAll works
//          nDoTests =  4   // 4. Check if '/api/world/cities/filter=' -> city.controllers.findMany works
            nDoTests =  5   // 6. Check if '/api/world/cities'         -> city.controllers.createOne works
//          nDoTests =  6   // 7. Check if '/api/world/cities'         -> city.controllers.updateOne works
//          nDoTests =  7   // 5. Check if '/api/world/cities/delete'  -> city.controllers.deleteOne works

// -------------------------------------------------------------------------------------------------

      if (doTest( 1, __filename )) {   // Check if '/api/world/cities/models' -> city.controllers.getModel works

      var  aRoute          = '/api/world/cities/model'
      var  aRoute          = '/api/world/countries/model'

                    testRoute_model( 'GET', aRoute )

    async  function testRoute_model( aMethod, aRoute ) { 
    try { 
           await jstFns.sndAPI(  aMethod, `${aHost}${aRoute}` )
  } catch( pErr ) {
           console.log( `* Error testing model: for model, '${aRoute}':`, pErr ); 
           }
        } // eof testRoute_model
//    ------------------------------------------------------------------------
      } // eof Test1 
// -------------------------------------------------------------------------------------------------

      if (doTest( 2, __filename )) {   // Check if '/api/world/cities/4080' -> city.controllers.getOne works

      var  aRoute          = '/api/world/cities/4080'
//    var  aRoute          = '/api/world/cities/99999'

                    testRoute_model( 'GET', aRoute )

    async  function testRoute_model( aMethod, aRoute ) { 
    try { 
           await jstFns.sndAPI(  aMethod, `${aHost}${aRoute}` )
  } catch( pErr ) {
           console.log( `* Error testing model: for model, '${aRoute}':`, pErr ); 
           }
        } // eof testRoute_model
//    ------------------------------------------------------------------------
      } // eof Test1 
// -------------------------------------------------------------------------------------------------

      if (doTest( 3, __filename )) {   // 3. Check if '/api/world/cities' -> city.controllers.findAll works

       var  aRoute          = '/api/world/cities'

            jstFns.sndAPI(    'GET', `${aHost}${aRoute}` )
                   
//    ------------------------------------------------------------------------
      } // eof Test3 
// -------------------------------------------------------------------------------------------------

      if (doTest( 4, __filename )) {   // 4. Check if '/api/world/cities/filter=' -> city.controllers.findMany works

       var  aRoute          = '/api/world/cities'

       var  aData           = '?filter={}&range=[10,19]&sort=["id","ASC"]'

            jstFns.sndAPI(    'GET',    `${aHost}${aRoute}`, aData )
                   
//    ------------------------------------------------------------------------
      } // eof Test4 

      if (doTest( 5, __filename )) {   // 5. Check if '/api/world/cities' -> city.controllers.createOne works

       var  aRoute          = '/api/world/cities'

       var  pData   = {  Name          : 'Reston'     // Must be ColToSearch
                      ,  CountryCode   : 'USA'
                      ,  District      : 'Virginia'
//                    ,  Population    :  58404                    
                         }
            jstFns.sndAPI(    'POST',   `${aHost}${aRoute}`, pData )

//    ------------------------------------------------------------------------
      } // eof Test6 
// -------------------------------------------------------------------------------------------------
 
      if (doTest( 6, __filename )) {   // 6. Check if '/api/world/cities' -> city.controllers.updateOne works

       var  aRoute          = '/api/world/cities'

       var  pData           =  {           Name: 'Reston2' }  // Case is important
//     var  pData           =  { ID: 4082, Name: 'Reston2' }  // Primary Key should not be part of updated data

//          jstFns.sndAPI(    'GET',    `${aHost}${aRoute}`       )
//          jstFns.sndAPI(    'GET',    `${aHost}${aRoute}/4081`     )
//          jstFns.sndAPI(    'GET',    `${aHost}${aRoute}`,      aData )

            jstFns.sndAPI(    'PUT',    `${aHost}${aRoute}/4082`, pData )

//    ------------------------------------------------------------------------
      } // eof Test6 
// -------------------------------------------------------------------------------------------------
 
      if (doTest( 7, __filename )) {   // 7. Check if '/api/world/cities/delete' -> city.controllers.deleteOne works

      var  aRoute          = '/api/world/cities/4084'

                    testRoute_model( 'DELETE', aRoute )

    async  function testRoute_model( aMethod, aRoute ) { 
    try { 
           await jstFns.sndAPI(  aMethod, `${aHost}${aRoute}` )
  } catch( pErr ) {
           console.log( `* Error testing model: for model, '${aRoute}':`, pErr ); 
           }
      } // eof testRoute_model
//    ------------------------------------------------------------------------
      } // eof Test7 
// -------------------------------------------------------------------------------------------------
//  eof Tests  
// --------------------------------------------------------------------------------------------------------------
 

