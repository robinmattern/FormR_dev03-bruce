// -------------------------------------------------

 if ('test' == 'text') {  

//    console.log( '[1] pConfig: ""',               dbConfigs( ''      ) ) 
      console.log( '[2] pConfig: "foo"',            dbConfigs( 'foo'   ) )
      console.log( '[3] pConfig: "MySQL_Local_IO"', dbConfigs( 'MySQL_Local_IO' ) )
      }

      module.exports = dbConfigs  

// -------------------------------------------------

function dbConfigs( aDBSN ) { 

//  --------------------------------------

  if (aDBSN == '') { 

  var aDBSN = process.env.DBSN 
  if (aDBSN) { 
      console.log( `    Using DB: ${aDBSN}\n` )
  } else { 
      console.log( ` ** Please specify a DB in .env` )
      process.exit() 
      }

  var pConfig = getConfigs( )[ aDBSN ]
  if (pConfig) { 
      pConfig.DBSN = aDBSN 
      return pConfig
   } else { 
      console.log( `*** DB, ${aDBSN} Not found` )
      process.exit() 
      }    

    } // eif aDBSN == '' 
//  --------------------------------------

         pConfig  = getConfigs( )[ aDBSN ] 
     if (pConfig) { pConfig.DBSN = aDBSN }
  return pConfig      

function getConfigs( ) { 
   
   return {

// -------------------------------------------------

  'MySQL_Local_IO' : {

    HOST     : 'localhost',
    USER     : 'io',
    PASSWORD : 'IO.usr216',
    DB       : 'io',
    dialect  : 'mysql',
    pool: {
      max    : 5,
      min    : 0,
      acquire: 30000,
      idle   : 10000
      }
    }
// -------------------------------------------------

, 'Local_MySQL_Practice': {
  
    HOST     : 'localhost',
    USER     : 'root',
    PASSWORD : 'Washington!12345',
    DB       : 'practice',
    dialect  : 'mysql',
    pool: {
      max    : 5,
      min    : 0,
      acquire: 30000,
      idle   : 10000
      }
    }
// -------------------------------------------------

, 'MySQL_AWS_IO': {
    
    HOST     : '13.57.57.151',
    USER     : 'io',
    PASSWORD : 'IO.usr216',
    DB       : 'io',
    dialect  : 'mysql',
    pool: {
      max    : 5,
      min    : 0,
      acquire: 30000,
      idle   : 10000
      }
    }
// -------------------------------------------------

, 'MSSQL_Azure_IO': {

    HOST     : 'sc203d-azn3.database.windows.net',
    USER     : 'sco',
    PASSWORD : 'Azn.ani000',
    DB       : 'IO' ,
    dialect  : 'mssql' ,
    dialectOptions: {
      options: {
        encrypt: true ,
        validateBulkLoadParameters: false
        }
      } ,
    pool: {
      max    : 5,
      min    : 0,
      acquire: 30000,
      idle   : 10000
      }
    }
  };}; // eof getConfigs( ) { return { ... } }
} // eof dbConfigs 
