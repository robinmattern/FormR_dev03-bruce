
//    FormR       =  require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
  var FormR       =  require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
      FormR.init(  __dirname, __filename );       //  FormR.help(); process.exit()                                    

//    FormR.setEnv( )                                                                       // .(10317.03.8 RAM Only necessary if you need process.env vars to be read from .env)

// -------------------------------------------------------------------------------------------------

  var dbConnect          =  require( `${FORMRs_4}/db.connect3-2.njs` )                      // .sequelize// .(10325.04.2 RAM Gotta use FORMRs_4).(10326.02.x).(10328.05.1 RAM We love to change names).(10928.03.1 RAM Changed extension to .njs) 

  var pDB                =  dbConnect( '' )                                                 // .(10220.10.3).(10328.06.4 RAM Back to a normal app)
//var pDB                =  dbConnect( 'MySQL_AWS_WORLD' );                                 //#.(10220.10.1 RAM Switch to db.connect).(10328.0x.x).(10414.02.4).(10928.02.4) 
  var pDB                =  dbConnect( 'MySQL_AWS_WORLD', 'checkDB' );                      // .(10220.10.1 RAM Switch to db.connect).(10328.0x.x).(10414.02.2).(10928.02.4 RAM add 'checkDB')

//var pDBs               =  { };                                                            // .(10416.01.1)
//var pDBs               =  dbConnect( 'MySQL_VULTR_IO' );                                  //#.(10319.10.1 RAM Switch to DBSN directly with db.connect)
//var pDBs               =  dbConnect( 'WORLD' );                                           // .(10220.10.1 RAM Switch to db.connect).(10328.0x.x).(10414.02.2)
//    pDBs[ pDB.DBSN  ]  =  pDB                                                             // .(10416.01.2 RAM This is they way to have muptiple DBs, Not quite, DBSN is assigned to pDB.table.DBSN ) 

//    pDB.fruser         =  require( "${FORMRs_4_API}/models/fruser.model.js")(  pDB, 'users'           )   //#.(10220.10.4 RAM Was: (sequelize, Sequelize) ).(10328.06.7).(10414.02.3
//    pDB.fruser         =  require(              "../models/fruser.model.js")(  pDB, 'users'           )   // .(10220.10.4 RAM Was: (sequelize, Sequelize) ).(10328.06.8) 
//    pDB.fruser.DB      =  pDB // or pDBs[ pDB[ pDB.DBSN ] ]                                               // .(10416.01.6) 

//    pDB.frrole         =  require( "${FORMRs_4_API}/models/frrole.model.js")(  pDB, 'roles'           )   //#.(10309.03.1 RAM Need this).(10328.06.8).(10414.02.4) 
//    pDB.frrole         =  require(              "../models/frrole.model.js")(  pDB, 'roles'           )   // .(10309.03.1 RAM Need this).(10328.06.8) 
//    pDB.frrole.DB      =  pDB // or pDBs[ pDB[ pDB.DBSN ] ]                                               // .(10416.01.5) 

      pDB.city           =  require(              "../models/city.model.js"  )(  pDB, 'city'            )   // .(10326.03.4 RAM Add World models).(10326.07.x RAM Not in this FormR database)
      pDB.city.DB        =  pDB // or pDBs[ pDB[ pDB.DBSN ] ]                                               // .(10416.01.6) 

      pDB.country        =  require(              "../models/country.model.js")( pDB, 'country'         )   // .(10326.03.5).(10326.07.x) 
      pDB.country.DB     =  pDB // or pDBs[ pDB[ pDB.DBSN ] ]                                               // .(10416.01.7) 

//    pDB.countrylanguage=  require( "../models/countrylanguage.model.js"    )(  pDB, 'countryLanguage' )   //#.(10326.03.6).(10326.07.x)
//    pDB.countrylanguage.DB =  pDB // or pDBs[ pDB[ pDB.DBSN ] ]                                           // .(10416.01.8) 

// -------------------------------------------------------------------------------------------------
/*                                                                                          //#.(10415.05.8 RAM Only implementing one role on User table) 
                                                                                            //#.(10326.03.7 Beg RAM Only for IODD User, Roles and user_roles).(10328.06.9) 
      pDB.frrole.belongsToMany( pDB.fruser                                                  // .(10309.03.2 Beg RAM Need this)
//    pDB.role.belongsToMany( pDB.fruser                                                    // .(10317.08.1 RAM No Workie).(10323.02.1 RAM Was: pDB.fuser. Maybe it will work with the correct table name)
//    pDB.role.belongsToMany( pDB2.fuser                                                    // .(10317.08.1 RAM No Workie:  roles.belongsToMany called with something that's not a subclass of Sequelize.Model)
//    pDB.role.belongsToMany( pDB2.users                                                    // .(10317.08.1 RAM No Workie).(10323.02.2 RAM Was: pDB2.fuser. Maybe it will work with the correct table name)
        , { through      : "user_roles"
          , foreignKey   : "roleId"
          , otherKey     : "userId"
            } );
      pDB.fruser.belongsToMany( pDB.frrole                                                  // .(10328.06.01 RAM 'fr..' or '..' for model name)
        , { through      : "user_roles"
          , foreignKey   : "userId"
          , otherKey     : "roleId"
            } );

      var pRole          =  pDB.frrole;                                                     // .(10315.02.1 Beg RAM Moved to models.index.js)

 function initial( ) {
//        pRole.create(  {  id: 1,  name: "user"     } );                                   //#.(10415.06.2)
          pRole.create(  {  id: 1,  name: "viewer"   } );                                   // .(10415.06.2 RAM New Default User role)
          pRole.create(  {  id: 2,  name: "editor"   } );                                   // .(10315.02.3 RAM Was moderator) 
          pRole.create(  {  id: 3,  name: "admin"    } );
          }                                                                                 // .(10315.02.2 End)
*/                                                                                          //#.(10415.05.8)
//    pDB.ROLES          = [ "user",   "admin", "editor" ];                                 //#.(10309.03.2 End).(10414.05.1)
      pDB.ROLES          = [ "viewer", "editor", "admin" ];                                 // .(10309.03.2 End).(10414.05.1 RAM Reorder them)

//    ----------------------------------------------------------------------------------

      module.exports     =  pDB;
//    module.exports     =  pDBs;                                                           //#.(10416.01.7 RAM Or put the pDB Object in each pDB.table)

//                          trace(  '\nmodule.exports' )

// -------------------------------------------------------------------------------------------------

          nDoTests       =  1          // 1. Format pModels
//
//                                                    pDB = Sequelize methods, not controller.menthods 
//        nDoTests       =  4          // 4. Check if pDB[ 'city'    ].findAll works
//        nDoTests       =  5          // 4. Check if pDB[ 'city'    ].getOne works
//        nDoTests       =  6          // 6. Check if pDB[ 'country' ].findByPk works
//        nDoTests       =  7          // 7. Check if pDB[ `city'    ].create works 
//        nDoTests       =  8          // 7. Check if pDB[ `city'    ].update works 

// -------------------------------------------------------------------------------------------------

      if (doTest( 1, __filename )) {   // 1. Format pModels

          FormR.Help() 
          FormR.shoModel(  pDB, 'city'    ) 
          FormR.shoModel(  pDB, 'country' ) 
          FormR.shoModel(  pDB, 'countrylanguage' ) 
                    
//    ------------------------------------------------------------------------
      } // eof Test1 
// -------------------------------------------------------------------------------------------------

      if (doTest( 4, __filename )) {   // 4. Check if pDB[ 'city' ].findAll works
 
      var aModel = 'city';   aId =  1

                    testModel_findAll(  aModel ) 
          function  testModel_findAll(  aModel ) { 
          
                        pDB[ aModel ].findAll( )
   .then( pBody => {
      if (pBody) {
          console.log(  JSON.stringify( pBody, null, 4 ) ); 
      } else { 
          console.log( `* No ${aModel} found for aID, '${aId}'.` ); 
      } } )
  .catch( pErr  => {
          console.log( `* Error retrieving id: '${aId} from model, '${aModel}':`, pErr ); 
          } );          
//      -------------------------------------------          
        } // eof testModel_getOne
//    ------------------------------------------------------------------------
      } // eof Test4 
//    ----------------------------------------------------------------------------------


      if (doTest( 5, __filename )) {   // 5. Check if pDB[ `city` ].getOne works 
 
     var aModel = 'city';     aId =  4050

                    testModel_getOne(  aModel, aId ) 

          function  testModel_getOne(   aModel, aId ) { 
          
                        pDB[ aModel ].findByPk( aId )
   .then( pBody => {
      if (pBody) {
          console.log(  pBody.toJSON( ) ); // This is good!
//        console.log(  JSON.stringify( pBody, null, 4 ) ); // This is also good!
      } else { 
          console.log( `* No ${aModel} found for aID, '${aId}'.` ); 
      } } )
  .catch( pErr  => {
          console.log( `* Error retrieving id: '${aId} from model, '${aModel}':`, pErr ); 
          } );          
//      -------------------------------------------          
        } // eof testModel_getOne
//    ------------------------------------------------------------------------
      } // eof Test5 
//    ----------------------------------------------------------------------------------
      
      
      if (doTest( 6, __filename )) {   // 6. Check if pDB[ `country` ].findByPk works for country
 
      var aModel = 'country';   aId =  'USA'

                    testModel_getOne(  aModel, aId ) 
          function  testModel_getOne(  aModel, aId ) { 
          
                        pDB[ aModel ].findByPk( aId )
   .then( pBody => {
      if (pBody) {
//        console.log(  pBody.toJSON( ) ); // This is good!
          console.log(  JSON.stringify( pBody, null, 4 ) ); // This is also good!
      } else { 
          console.log( `* No ${aModel} found for aID, '${aId}'.` ); 
      } } )
  .catch( pErr  => {
          console.log( `* Error retrieving id: '${aId} from model, '${aModel}':`, pErr ); 
          } );          
//      -------------------------------------------          
        } // eof testModel_getOne
//    ------------------------------------------------------------------------
      } // eof Test6 
//    ----------------------------------------------------------------------------------

      if (doTest( 7, __filename )) {   // Check if pDB[ `${aModel} ].create works 
 
      var aModel  = 'city'

      var pData   = {  Name          : 'Reston'
                    ,  CountryCode   : 'USA'
                    ,  District      : 'Virginia'
                    ,  Population    :  58404                    
                       }

                    testModel_createOne(  aModel, pData ) 

    async function  testModel_createOne(  aModel,  pData ) { 

//  const jane  = await   User.create( { name: "Jane"  } );
    try { 
      var pBody = await pDB[ aModel ].create( pData ) 

          console.log(  JSON.stringify( pBody, null, 4 ) ); // This is also good!

 } catch( pErr ) {
          console.log( `* Error creating ${aModel}: ${pData.Name} in model, '${aModel}':`, pErr ); 
                    };  
//      -------------------------------------------          
        } // eof testModel_createOne    
//    ------------------------------------------------------------------------
      } // eof Test7 
// -------------------------------------------------------------------------------------------------

      if (doTest( 8, __filename )) {   // Check if pDB[ `${aModel} ].update works with no validation checks
 
      var aModel  = 'city', nID = 4080 

      var pData   = { Population    :  60000 }                   
      var pWhere  = { where: { id: nID } }

                    testModel_updateOne( aModel, pData, pWhere ) 

    async function  testModel_updateOne( aModel, pData, pWhere ) { 
    try { 
      
                  await pDB[ aModel ].update( pData, pWhere ) 
      var pBody = await pDB[ aModel ].findByPk( nID );

          console.log(  JSON.stringify( pBody, null, 4 ) );  

 } catch( pErr ) {
          console.log( `* Error updating city id: ${nID} in model, '${aModel}':`, pErr ); 
                    };  
//      -------------------------------------------          
        } // eof testModel_updateOne    
//    ------------------------------------------------------------------------
      } // eof Test8 
// -------------------------------------------------------------------------------------------------
// eof Tests 
// ------------------------------------------------------------------------------------------------------
