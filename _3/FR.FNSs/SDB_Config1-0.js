/*
module.exports = {
  HOST     : "localhost",
  USER     : "root",
  PASSWORD : "123456",
  DB       : "testdb",
  dialect  : "mysql",
  pool: {
    max    : 5,
    min    : 0,
    acquire: 30000,
    idle   : 10000
  }
};
*/
// -------------------------------------------------

  var aDBSN = process.env.DBSN
  if (aDBSN) { 
      console.log( `  Using DB: ${aDBSN}\n` )
  } else { 
      console.log( `* Please specify a DB in .env\n` )
      process.exit() 
      }

// -------------------------------------------------

if ( aDBSN == 'MySQL_Local_Practice' ) {

module.exports = {
  HOST     : 'localhost',
  USER     : 'root',
  PASSWORD : 'Washington!12345',
  DB       : 'practice',
  dialect  : 'mysql',
  pool: {
    max    :  5,
    min    :  0,
    acquire:  30000,
    idle   :  10000
    }
  };
} // eif ( aDBSN == 'Local_MySQL_Practice' )
// -------------------------------------------------

if ( aDBSN == 'MySQL_AWS_IO' ) {

module.exports = {
  HOST     : '13.57.57.151',
  USER     : 'io',
  PASSWORD : 'IO.usr216',
  DB       : 'io',
  dialect  : 'mysql',
  pool: {
    max    :  5,
    min    :  0,
    acquire:  30000,
    idle   :  10000
    }
  };
} // eif ( aDBSN == 'MySQL_AWS_IO' )
// -------------------------------------------------
if ( aDBSN == 'MSSQL_Azure_IO' ) {

module.exports = {
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
    max    :  5,
    min    :  0,
    acquire:  30000,
    idle   : 0000
    }
  };

  } // eif ( aDBSN == 'Azure_MSSQL_IO' )
// -------------------------------------------------

