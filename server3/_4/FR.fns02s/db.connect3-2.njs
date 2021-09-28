// ------------------------------------------------------------------------------------------

//nction dbConnect( aDBSN ) {                                      //#.(10121.02.3 RAM A connection for each Table?).(10928.02.1)
function dbConnect( aDBSN, aCheckDB ) {                            // .(10121.02.3 RAM A connection for each Table?).(10928.02.1 RAM Add CheckDB option)         
// 
   const    Sequelize =  require( 'sequelize' );

   const    dbConfig  =  getDbConfig( aDBSN )                      // .(10220.01.1 RAM Move function into this script)

//          -------------------------------------------------------------------------

            dbConfig.POOL          =   dbConfig.POOL               // .(10220.02.1 Beg RAM Make POOL optional)
                                   ?   dbConfig.POOL 
                                   : { max    : 5
                                     , min    : 0
                                     , acquire: 30000
                                     , idle   : 10000
                                       }                           // .(10220.02.1 End)
            
            dbConfig.LOGGING       =   dbConfig.LOGGING            // .(10220.04.1 Beg RAM Add LOGGING option)
                                   ?   dbConfig.LOGGING 
                                   :  'false'
                                                                  
            dbConfig.LOGGING       =  (dbConfig.LOGGING == 'true' ) ?  console.log                 : dbConfig.LOGGING                                      
            dbConfig.LOGGING       =  (dbConfig.LOGGING == 'false') ?  function( str ) { a = str } : dbConfig.LOGGING                                      
                                                                   // .(10220.04.1 End)

//          -------------------------------------------------------------------------

     try {
     var    dbOptions =
             {  host               :   dbConfig.HOST
             ,  dialect            :   dbConfig.DIALECT            // .(10220.02.2 RAM Change to Uppercase)

//           ,  logging            :   console.log
//           ,  logging            :   function( str ) { console.log( str ) }, // do your own logging
//           ,  logging            :   function( str ) { a = str }
             ,  logging            :   dbConfig.LOGGING            // .(10220.04.2)
                
             ,  pool:                                              
                {  max             :   dbConfig.POOL.max           // .(10220.02.3 Beg)
                ,  min             :   dbConfig.POOL.min
                ,  acquire         :   dbConfig.POOL.acquire
                ,  idle            :   dbConfig.POOL.idle          // .(10220.02.3 End)
                   }
                }  // eob dbOptions 
//          -----------------------------------------------------------------

       if ( dbConfig.DIALECTOPTIONS) {
            dbOptions.dialectOptions = dbConfig.DIALECTOPTIONS
            }
//          -----------------------------------------------------------------

        var sequelize              =   new Sequelize (
                dbConfig.DB
             ,  dbConfig.USER
             ,  dbConfig.PASSWORD
             ,  dbOptions
                )
        } catch( e ) {
            console.log( `dbConnect[ 8] ** Error: the file, '${aConfigFile} contains invalid Sequelize options.` )
            process.exit()
//          throw `Error: dbConnect[ 8] ** Error: the file, '${aConfigFile} contains invalid Sequelize options.`      
            }        
//          -------------------------------------------------------------------------

        if (aCheckDB == 'checkDB') {                               // .(10928.02.2 Beg RAM Check DB Connection)  
            chkConnect( sequelize, dbConfig )
            }                                                      // .(10928.02.1 End)  
//          -------------------------------------------------------------------------

            sequelize.config.DBSN  =  dbConfig.DBSN                // .(10110.01.3).(10220.03.1 RAM aDBSN is also in sequelize.config.DBSN)

  return {  sequelize              :  sequelize                    // .(10110.01.4)
         ,  Sequelize              :  Sequelize   }

            } 

   module.exports                  =  dbConnect                    // .(10121.02.3)
//          }                                                      //#.(10121.02.3)

// ------------------------------------------------------------------------------------------

      module.exports = dbConnect

// -------------------------------------------------

async function chkConnect( pDB, aDBSN ) {                       // .(10928.02.4 Beg RAM Added)
    try { 
          await pDB.authenticate()  // sequelize.authenticate()
//        await pDB.query( 'select count(*) from users' )
//          console.log( `  dbConnect[ 9]    Can connect to DBSN: ${aDBSN}.` )
        } catch(err) {
            console.log( `  dbConnect[10] ** Error: Can't connect to DBSN: ${aDBSN}. **`, err )
            process.exit()
//          throw `Error: dbConnect[10] ** Error: Can't connect to DBSN: ${aDBSN}.` 
        }   } 
// -------------------------------------------------

function getDbConfig( aDBSN ) {

//  --------------------------------------

//   if (aDBSN == 'FORMR') {                           //#.(10317.05.1 Beg RAM Connect to the seperate FORMR DB).(10928.01.2) 
     if (aDBSN == 'RAUTH') {                           // .(10317.05.1 Beg RAM Connect to the seperate FORMR DB).(10928.01.2 RAM Change DB Ref Name) 

//   var aDBSN = process.env[ `DBSN_4FORMR` ]          //#.(10928.01.3) 
     var aDBSN = process.env[ `DBSN_4RAUTH` ]          // .(10928.01.3)       
   if (! aDBSN ) {                                 
     var aDBSN = ''
         }
       } // eif aDBSN == 'FORMR'                       // .(10317.05.1 End) 
//  --------------------------------------

     if (aDBSN == '') {

     var aUSER = process.env[ 'username' ]                  // .(10213.02.1)
     var aDBSN = process.env[ `DBSN_4${aUSER}` ]            // .(10213.02.2 Beg RAM get DBSN for ${username} if defined)
   if (! aDBSN ) {                                          // .(10213.02.3)

     var aDBSN = process.env.DBSN || 'none'                 // .(10220.04.1 RAM Get's an error if not in .env)
         }
       } // eif aDBSN == ''
//  --------------------------------------
//   var aConfigFile                                        //#.(10905.02.1 RAM Make it global for error message)

         pConfig  =  getDbConfigs(     aDBSN     )
     if (pConfig) { 
         aDBSN    =  pConfig.DBSN
         console.log( `\n  Using the Database DBSN: ${aDBSN}` )

     if (process.env.DB_LOGGING) {                                           // .(10220.04.3 Beg)
//       pConfig.LOGGING = process.env.DB_LOGGING                            //#.(10905.05.1 )
         pConfig.LOGGING = process.env.DB_LOGGING.match( /1|true/i) ? 'true' : 'false'  // .(10905.05.1 )
         }                                                                   // .(10220.04.3 End)
     } else {
     if (aDBSN == 'none') {
         console.log( ` ** Please specify a valid DBSN in your '.env' file` )
         throw `Error: getDbConfig[ 8] ** Please specify a valid DBSN in your '.env' file.`      
     } else {
     var aMsg = aDBSN.match( /\./ ) 
              ? `*** The DB Config file, '${aDBSN}', was NOT found.`
              : `*** The DBSN, '${aDBSN}', was NOT found in the DB Config file, '${aConfigFile}'.`         // .(10905.02.2 RAM Added , '${aConfigFile})
         console.log( aMsg ) 
         throw `Error: getDbConfig[ 9] ${aMsg}`      
       } }
//  --------------------------------------

  return pConfig
         }
// ---------------------------------------------------------

function getDbConfigs( aFile1,  aDBSN ) {                                                                   // aFile1: aDBSN, '' or aCustom file name

     var pFS = require( 'fs' ); aDBSN  = aDBSN ? aDBSN : aFile1                                             // .(10325.06.1 RAM Pretty kludgy)

//if ( !`${APP_HOME}`.match(/server[\\\/]app[0-9]/)) {                                                      //#.(10325.06.2 RAM If APP_HOME not an app folder, then ).(10905.02.4 Beg) 
//       aConfigFile  = `${ process.env.FORMR_HOME }/_3/FR.FNSs/SDB_Config3-0.json`; aFile1 = ''            //#.(10325.06.3 RAM Use the global DB_Config file) 
//   } else {                                                                                               //#.(10905.02.4 End) 
         aDir         = `${APP_HOME_API}/config/`
         aFile1       =  aFile1.replace( /.+config\//, '' )                                                 // .(10905.02.3 RAM Use aFile1 passed as arg) 
         aFile2       = 'my.config.json',                                                                   // .(10317.02.1 RAM Was __dirname)
         aConfigFile  =  aDir + 'db.config.json';                
         aConfigFile  = (pFS.existsSync( aDir + aFile2 ) ? aDir + aFile2 : aConfigFile );                   // .(10905.02.2 RAM Use my.config.json if it exists)
//       }                                                                                                  //#.(10905.02.5) 
     if (aFile1.match( /.json/ )) {                                                                         // .(10905.02.4 RAM Use passed config file is it is a .json file)
         aConfigFile  = (pFS.existsSync( aDir + aFile1 ) ? aDir + aFile1 : aConfigFile );  
         } 

     if (pFS.existsSync( aConfigFile) != true) {                                                            // .(10905.02.6 RAM If config file doesn't exist in APP_HOME_API, then ) 
         aConfigFile  = `${ process.env.FORMR_HOME }/_3/FR.FNSs/SDB_Config3-0.json`                         //#.(10905.02.7 RAM Use the global DB_Config file) 
         } 

     if (pFS.existsSync( aConfigFile) != true) {
         console.log(   `getConfig[ 8]  ** Error: the file, '${aConfigFile} does NOT exist.` )
         throw   `Error: getconfig[ 8]  ** Error: the file, '${aConfigFile} does NOT exist.`   
//   } else {                                                                                               //#.(10325.06.4)
//       aFile1       = (aConfigFile == aDir + aFile2) ? '' : aFile1                                        //#.(10220.04.2 Get rid of 'none' if my.config.json is used ).(10325.06.4 ???)
         }
    try {     
     var pJSON        =  JSON.parse( pFS.readFileSync( aConfigFile, 'ASCII' ) )  
    } catch( e ) { 
         console.log(   `getConfigs[ 9]  ** Error: the file, '${aConfigFile} is not a valid JSON file.` )
         throw   `Error: getconfigs[ 9]  ** Error: the file, '${aConfigFile} is not a valid JSON file.`      
         }          
     if (pJSON['HOST']) { aDBSN = `${pJSON['DIALECT']}_${pJSON['HOST'].replace(/[^\w]/g, '').substr(0,5)}_${pJSON['DB']}` 
    var  pJSON1 = { };   pJSON1[ aDBSN ] = pJSON; pJSON = pJSON1                                            // .(10220.06.1 If there is no DBSN)
         }
     var mDBSNs =  Object.keys( pJSON )
     var aDBSN  = (mDBSNs.length == 1)  ? mDBSNs[0] : aFile1 || mDBSNs[0]
     if (pJSON[ aDBSN ]) { pJSON[ aDBSN ].DBSN = aDBSN }
  return pJSON[ aDBSN ]   
         }
// ---------------------------------------------------------
// ------------------------------------------------------------------------------------------
