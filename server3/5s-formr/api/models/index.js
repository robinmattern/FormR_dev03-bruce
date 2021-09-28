
//    FormR       =  require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
  var FormR       =  require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
      FormR.init(  __dirname, __filename );       //  FormR.help(); process.exit()                                    

//    FormR.setEnv( )                                                                       // .(10317.03.8 RAM Only necessary if you need process.env vars to be read from .env)

// -------------------------------------------------------------------------------------------------

  var dbConnect          =  require( `${FORMRs_4}/db.connect3-1.js` )                       // .sequelize// .(10325.04.2 RAM Gotta use FORMRs_4).(10326.02.x).(10328.05.1 RAM We love to change names) 

//var pDB                =  dbConnect( '' )                                                 // .(10220.10.3).(10328.06.4 RAM Back to a normal app)
  var pDB                =  dbConnect( 'FORMR' );                                           // .(10220.10.1 RAM Switch to db.connect).(10328.0x.x).(10414.02.2)

//var pDBs               =  { };                                                            // .(10416.01.1)
//var pDBs               =  dbConnect( 'MySQL_VULTR_IO' );                                  //#.(10319.10.1 RAM Switch to DBSN directly with db.connect)
//var pDBs               =  dbConnect( 'WORLD' );                                           // .(10220.10.1 RAM Switch to db.connect).(10328.0x.x).(10414.02.2)
//    pDBs[ pDB.DBSN  ]  =  pDB                                                             // .(10416.01.2 RAM This is they way to have muptiple DBs, Not quite, DBSN is assigned to pDB.table.DBSN ) 

//    pDB.fruser         =  require( "${FORMRs_4_API}/models/fruser.model.js")(  pDB, 'users'           )   //#.(10220.10.4 RAM Was: (sequelize, Sequelize) ).(10328.06.7).(10414.02.3
      pDB.fruser         =  require(              "../models/fruser.model.js")(  pDB, 'users'           )   // .(10220.10.4 RAM Was: (sequelize, Sequelize) ).(10328.06.8) 
      pDB.fruser.DB      =  pDB // or pDBs[ pDB[ pDB.DBSN ] ]                                               // .(10416.01.6) 

//    pDB.frrole         =  require( "${FORMRs_4_API}/models/frrole.model.js")(  pDB, 'roles'           )   //#.(10309.03.1 RAM Need this).(10328.06.8).(10414.02.4) 
      pDB.frrole         =  require(              "../models/frrole.model.js")(  pDB, 'roles'           )   // .(10309.03.1 RAM Need this).(10328.06.8) 
      pDB.frrole.DB      =  pDB // or pDBs[ pDB[ pDB.DBSN ] ]                                               // .(10416.01.5) 

      pDB.city           =  require(              "../models/city.model.js"  )(  pDB, 'city'            )   //#.(10326.03.4 RAM Add World models).(10326.07.x RAM Not in this FormR database)
      pDB.city.DB        =  pDB // or pDBs[ pDB[ pDB.DBSN ] ]                                               // .(10416.01.6) 

      pDB.country        =  require(              "../models/country.model.js")( pDB, 'country'         )   //#.(10326.03.5).(10326.07.x) 
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

          nDoTests       =  5

// -------------------------------------------------------------------------------------------------

     if (doTest( 1, __filename )) {   // Check if pDB[ `${aModel} ].create works
     
      var pData   = { 'username'     : 'robin104'
                    , 'email'        : 'robin.mattern@sicomm.net'
                    , 'password'     : '1234'
                    , 'role'         : 'user'
                    , 'passworddate' :  fmtDate( 6, 90 ).substr( 0, 10 )
                       }

                    testModel_createOne( 'fruser', pData ) 

    async function  testModel_createOne(  aModel,  pData ) { 

//  const jane  = await   User.create( { name: "Jane"  } );
    try { 
      var pBody = await pDB[ aModel ].create( pData ) 

          console.log(  pBody.toJSON( ) ); // This is good!
          console.log(  JSON.stringify( pBody, null, 4 ) ); // This is also good!

 } catch( pErr ) {
          console.log( `* Error retrieving id: ${nId} from model, '${aModel}':`, pErr ); 
                    };  
//      -------------------------------------------          
        } // eof testModel_createOne    
//    ------------------------------------------------------------------------
      } // eof Test1 

//    ----------------------------------------------------------------------------------

      if (doTest( 2, __filename )) {   // Check if pDB[ `${aModel} ].create works 
 
      var aModel = 'fruser';   aId =  1

                    testModel_getOne(  aModel, aId ) 

//  async function  testModel_getOne(   aModel, aId ) { 
//    var pData = await pDB[ aModel ].findByPk( aId ) 

          function  testModel_getOne(   aModel, aId ) { 
          
                        pDB[ aModel ].findByPk( aId )
   .then( pBody => {
      if (pBody) {
          console.log(  pBody.toJSON( ) ); // This is good!
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
      } // eof Test2 

      if (doTest( 3, __filename )) {   // Check if pDB[ `${aModel} ].authenticate works 
 
      var aModel = 'fruser'

          pDB[ aModel ].sequelize.authenticate()
   .then( ( )  => {
          console.log( `  Connection to the model, '${aModel}' has been established successfully.` ) 
          } )
  .catch( pErr => {
          console.log( `* Unable to connect to the model, '${aModel}', in the database:`, pErr ) } );

//    ------------------------------------------------------------------------
      } // eof Test3 

      if (doTest( 4, __filename )) {   // Check if pDB[ `${aModel} ].authenticate works 
 
                    testModel_authenticate(  'fruser', 1 ) 
                    
    async function  testModel_authenticate(   aModel,  pData ) { 
   try {
    await pDB[ 'user' ].sequelize.authenticate()
 } catch( pErr ) {
          console.log( "Unable to connect to the database:", pErr ) }
//      -------------------------------------------          
        } // eof testModel_authenticate
//    ------------------------------------------------------------------------
      } // eof Test4 

      if (doTest( 5, __filename )) {   // format pModel
 
          fmtModel(  pDB, 'fruser' ) 
                    
//    ------------------------------------------------------------------------
      } // eof Test5 
// -------------------------------------------------------------------------------------------------
     // eof Tests 

  function  fmtModel( pDB, aModel ) { 
       var  pModel =  getModel( pDB, aModel )   
       var  mStr   =  [ 'var pModel ='
                      , ` {  ModelName : '${pModel.ModelName}'`
                      , ` {  TableName : '${pModel.TableName}'`
                      , ` ,  Schema    :`
                      , `     { "ColName(12)" :[ 'DataType(12)', 'Label(16)'       , 'FormType(12)', 'Format(11)', 'OtherParms()' ]`
//                    , `     ,  id           :[ 'int'         , "Id"              , 'id'          , 'R10'       , 'NOT NULL INCREMENT PRIMARY KEY' ]`
                      ,     ...  fmtCols( pModel.Schema )
                      , `        }`
                      , ` ,  HelpMessages :`
                      ,    ...   Object.keys( pModel.HelpMessages ).map( aCol => fmtHelp( aCol, pModel.HelpMessages[ aCol ] ) )   
                      , `  }`
                      , `}`
                         ]
            console.log( mStr.join( '\n' ) )

   function fmtCols(  pSchema ) { 
        var mCols  =  Object.keys( pSchema ).map( aCol => `     ,  ${ aCol.padEnd(13) }:[ ${ pSchema[ aCol ].join( ', ' ) } ]` ) 
     return mCols.slice(1)  
            }     
   function fmtHelp( aCol ) { return aCol }     
            }

function getModel( pDB, aModel ) {

       var  pModel =
             {  ModelName : aModel
             ,  TableName : pDB[ aModel ].name
             ,  Schema    :
                 { "ColName(12)" :[ 'DataType(12)', 'Label(16)'       , 'FormType(12)', 'Format(11)'             , 'OtherParms()' ] }
              }
            Object.keys( pDB[ aModel ].fieldRawAttributesMap ).forEach( aCol => {
       var  pCol  =  pDB[ aModel ].fieldRawAttributesMap[ aCol ]
       var  pType =  pCol.type, aType = `${pType}`.replace( /\(.+/, '' ) 
       var  aWdt  =  pType._length ? `(${pType._length})` : '' 
            pModel.Schema[ aCol ] = [ fmtCol( 12, `${aType}${aWdt}` )                                       // DataType
                                    , fmtCol( 16, aCol .substr(0,1).toUpperCase() +  aCol.substr(1), '"' )  // Label
                                    , fmtCol( 12, aType.substr(0,1) + aType.substr(1).toLowerCase() )       // FormType
                                    , fmtCol( 11, '' )                                                      // Format
                                    , fmtCol(  0,  fmtOth( pType.options, pCol ) )                          // OtherParms
                                       ]
            pModel.HelpMessages = {}                           
                    } ) // eol pDB[ aModel ].fieldRawAttributesMap ).forEach
   function fmtCol( nWdt, aCol, q ) { q = q ? q : "'"; return `${q}${aCol}${q}`.padEnd( nWdt + 2 )
            }                   
   function fmtOth( pOptions, pCol ) {
       var  aStr = (pOptions._zerofill ? ' NOT NULL'    : '' )
                 + (pCol.autoIncrement ? ' INCREMENT'   : '' )
                 + (pCol.primaryKey    ? ' PRIMARY KEY' : '' )
    return  aStr.substr(1)
            }
    return  pModel
            } // eof fmtCols