
// ----------------------------------------------------------------------------------------

//          savModelScripts( 'MySQL_AWS_IO', 'io', [ 'users', 'foo' ] )
//          savModelScripts( 'MSSQL_Azure_IO', 'io' )

       aDBSN = process.argv[2]

   if (aDBSN) {
       console.log( ` * Saving Model Scripts for DBSN: ${aDBSN}/` )                        
       savModelScripts( aDBSN )  
       process.exit()
       }

   module.exports = savModelScripts

// -------------------------------------------------------------------------

      async function savModelScripts( aDBSN, mDoTables ) {                              // .(10325.07.1 RAM Removed 2nd arg, aDB)

//     var  pDB = require(    '../config/db.connect.js'    )( aDBSN )   // .sequelize   //#.(10325.04.2)
       var  pDB = require( `${FORMRs_4}/SDB_Connect3-1.js` )( aDBSN )   // .sequelize   // .(10325.04.2 RAM Gotta use FORMRs_4)

       var  aDB = aDBSN ? aDBSN  : pDB.sequelize.config.database                        // .(10325.07.2 RAM Use Sequelize's database name, all lowercase, not FormR's name)

        var mTables = await getTables( pDB )                            // console.log( mTables )
        var aTables = ',' + mTables.join( ',' ) + ',';

    if (mDoTables) {
        var mTables = mDoTables.filter( aTable => {
        if (aTables.match(  `,${aTable},` )) { return true
        } else {
            console.log( ` ** The table, '${aTable}', is not in database: ${aDB}.` ); return false }
            } )
        }
   for (var aTable of mTables) {
        var mColumns = await getTableSchema( pDB, aTable );
        var pModel = { ModelName: aTable.replace( /s$/, ''), TableName: aTable, Schema: mColumns }
            savModelScript( pModel )
            writeFile(  `${ pModel.ModelName }.model.json`, fmtModel( pModel, '"' ) )
            killFile( `${ aTable }-schema.json` )

            console.log( `  Saved model script, '${ pModel.ModelName }.model.js'.`)
            }

        } // eof savModelScripts
// -------------------------------------------------------------------------

  async function getTables( pDB ) {
    var aDBName  = pDB.sequelize.config.database
    var aDialect = pDB.sequelize.config.DBSN.substr(0,5)    // .(10223.01.1 RAM Add MSSQL)

    if (aDialect == "MySQL") {                              // .(10223.01.2 RAM)
    var aSQL = `SELECT TABLE_NAME
                  FROM INFORMATION_SCHEMA.TABLES
                 WHERE TABLE_SCHEMA = '${aDBName}';
               ` }                                          // .(10223.01.3 Beg)
    if (aDialect == "MSSQL") {
    var aSQL = `SELECT TABLE_NAME
                  FROM INFORMATION_SCHEMA.TABLES
                 WHERE TABLE_CATALOG = '${aDBName}'
                   AND TABLE_TYPE = 'BASE TABLE' -- or 'VIEW'
               ` }                                          // .(10223.01.3 End)

  try { var mValues = await pDB.sequelize.query( aSQL );
     return mValues[0].map( pRow => pRow.TABLE_NAME )
        } catch (error) {
            console.error(" ** Unable to get list of table names.\n   SQL Error: "
                  , error.original ? error.original.sqlMessage : error );
         }  }
// -------------------------------------------------------------------------

  async function getTableSchema( pDB, aTable ) {
    var aDBName  = pDB.sequelize.config.database
    var aDialect = pDB.sequelize.config.DBSN.substr(0,5)    // .(10223.01.4 RAM)

    if (aDialect == "MySQL") {                              // .(10223.01.5 RAM)
    var aSQL = `SELECT COLUMN_NAME              as CName
                     , DATA_TYPE                as Type
                     , CHARACTER_MAXIMUM_LENGTH as Width
                     , NULL                     as Decimals
                     , COLUMN_DEFAULT           as DefaultVal
                     , IS_NULLABLE              as Nullable
                     , COLUMN_KEY               as KeyCol
                     , EXTRA                    as Extra
                  FROM INFORMATION_SCHEMA.COLUMNS
                 WHERE TABLE_SCHEMA='${aDBName}'
                   AND TABLE_NAME='${aTable}';
                ` }                                          // .(10223.01.6 Beg)
    if (aDialect == "MSSQL") {
    var aSQL = `SELECT COLUMN_NAME              as CName
                     , DATA_TYPE                as Type     -- int, bit, nvarchar, uniqueidentifier
                     , CHARACTER_MAXIMUM_WIDTH  as Width
                     , NUMERIC_PRECISION        as Decimals
                     , ''                       as DefaultVal
                     , IS_NULLABLE              as Nullable -- YES" or "NO"
                     , ''                       as KeyCol
                     , ''                       as Extra
                  FROM INFORMATION_SCHEMA.COLUMNS
                 WHERE TABLE_CATALOG = '${aDBName}'
                   AND TABLE_NAME = '${aTAble}'
                ` }                                         // .(10223.01.6 End)

      if (doTest( 2 )) {
          var mValues = JSON.parse( readFile( `${aTable}-schema.json`) )
      } else {

    try { var mValues = await pDB.sequelize.query( aSQL ); mValues = mValues[ 0 ]  // .(20121.1.1 RAM Heh??)

            writeFile( `${aTable}-schema.json`, JSON.stringify( mValues, '', 2 ) )

        } catch( error ) {
            console.error(" ** Unable to get schema for table: ${aTable}.\n   SQL Error: "
                  , error.original ? error.original.sqlMessage : error );
            return
         }  }
//      --------------------------------------------------------------
  try { var pCols   = { }
            mValues.forEach( fmtColumn )
     return pCols

//      ---------------------------------------------------------
        } catch( error ) {
            console.error(` ** Unable to format Model Definition for table: ${aTable}.\n   Schema Error: `
                  , error ? error : error );
            }
//      ---------------------------------------------------------

       function fmtColumn( pCol ) {
            var mCParms      = [ ]
                mCParms[ 0 ] =  fmtType1(  pCol.Type,   pCol.Width )
                mCParms[ 1 ] =  fmtLName(  pCol.CName )
                mCParms[ 2 ] =  fmtType2(  pCol.CName,  pCol.Type )
                mCParms[ 3 ] =  fmtFormat( mCParms[2],  pCol.Width, pCol.Type )
                mCParms[ 4 ] =  fmtOther(  pCol.KeyCol, pCol.Extra, pCol.Nullable )

         pCols[ pCol.CName ] =  mCParms

//      -------------------------------------------------

       function fmtType1(  aType, nWidth ) {
         return aType  + ( nWidth ? `(${nWidth})` : '' )
                }
//      -------------------------------------------------

       function fmtLName(  aName ) {
         return aName.substr(0,1).toUpperCase() + aName.substr(1)  // .toLowerCase()
                }
//      -------------------------------------------------

       function fmtType2(  aName, aType ) {
            var aType2 =  'text'
                aType2 = ( aType.match( /int$/i     ) ) ? 'number'    : aType2
                aType2 = ( aType.match( /integer$/i ) ) ? 'number'    : aType2
                aType2 = ( aName.match( /id$/i      ) ) ? 'id'        : aType2
                aType2 = ( aType.match( /float/i    ) ) ? 'decimal'   : aType2
                aType2 = ( aType.match( /double/i   ) ) ? 'decimal'   : aType2
                aType2 = ( aType.match( /float/i    ) ) ? 'decimal'   : aType2
                aType2 = ( aType.match( /char/i     ) ) ? 'text'      : aType2
                aType2 = ( aType.match( /varchar/i  ) ) ? 'text'      : aType2
                aType2 = ( aType.match( /nvarchar/i ) ) ? 'text'      : aType2 // MSSQL
                aType2 = ( aType.match( /blob|text/i) ) ? 'memo'      : aType2
                aType2 = ( aType.match( /date/i     ) ) ? 'date'      : aType2
                aType2 = ( aType.match( /time/i     ) ) ? 'time'      : aType2
                aType2 = ( aType.match( /year/i     ) ) ? 'year'      : aType2
                aType2 = ( aType.match( /datetime/i ) ) ? 'datetime'  : aType2
                aType2 = ( aType.match( /timestamp/i) ) ? 'timestamp' : aType2
                aType2 = ( aName.match( /zip/i      ) ) ? 'zipcode'   : aType2
                aType2 = ( aName.match( /pass.+d/i  ) ) ? 'password'  : aType2
                aType2 = ( aName.match( /phone/i    ) ) ? 'phone'     : aType2
                aType2 = ( aName.match( /amount/i   ) ) ? 'money'     : aType2
                aType2 = ( aName.match( /email/i    ) ) ? 'email'     : aType2
                aType2 = ( aName.match( /bit/i      ) ) ? 'bit'       : aType2  // MSSQL

         return aType2
                }
//      -------------------------------------------------

       function fmtFormat( aType2, nWidth, aType1 ) {
            var aWdt   = ( nWidth ? String(Math.floor(nWidth)) : '20'); aWdt = aWdt.padStart( aWdt.length < 2 ? 2 : aWdt.length, '0' )
            if (aType1.match( /double|float|decimal/ )) {
            var nDec   =  String( nWidth ).replace( /.+\./, '' ), aDec = take( nDec, '', '0')  // '0#'
            var aWdt   = `${aWdt}.${ nDec }`;                     aDec = take( (aWdt * 1) - ((nDec * 1) + 1), '', '#' ) + '.' + aDec
                }
            var aFmt   =  'L' + ( ( aWdt * 1 )  >= 75  ? '75' : aWdt )
                aFmt   = ( aType2.match( /id/       ) ) ? 'R05 0'                   : aFmt
                aFmt   = ( aType2.match( /text/     ) ) ? `L${aWdt}`                : aFmt
                aFmt   = ( aType2.match( /memo/     ) ) ? `M${aWdt}`                : aFmt
                aFmt   = ( aType2.match( /phone/    ) ) ? 'L14 (###) ###-####'      : aFmt // fmt as a string or number??
                aFmt   = ( aType2.match( /email/    ) ) ? 'L40'                     : aFmt
                aFmt   = ( aType2.match( /password/ ) ) ? 'L25'                     : aFmt
                aFmt   = ( aType2.match( /zip/      ) ) ? 'L10'                     : aFmt // allow for zip + 5
                aFmt   = ( aType2.match( /date/     ) ) ? 'R08 m/dd/yy'             : aFmt
                aFmt   = ( aType2.match( /time/     ) ) ? 'R08 h:mm:ss'             : aFmt
                aFmt   = ( aType2.match( /year/     ) ) ? `R${aWdt} ${ take( aWdt, 'yyyy' ) }` : aFmt
                aFmt   = ( aType2.match( /datetime/ ) ) ? 'R19 yyyy-mm-dd hh:mm'    : aFmt  // mm for minutes is a Microsoft kludge
                aFmt   = ( aType2.match( /timestamp/) ) ? 'R19 yyyy-mm-dd hh:mm:ss' : aFmt  // mm for minutes is a Microsoft kludge
                aFmt   = ( aType2.match( /number/   ) ) ? `R${aWdt} #,###,##0`      : aFmt
                aFmt   = ( aType2.match( /money/    ) ) ? `R${aWdt} $#,###,##0.00`  : aFmt  // needs work
                aFmt   = ( aType1.match( /int/      ) ) ? 'R10'                     : aFmt
                aFmt   = ( aType1.match( /tinyint/  ) ) ? 'R03 ##0'                 : aFmt
                aFmt   = ( aType1.match( /smallint/ ) ) ? 'R05 ##,##0'              : aFmt
                aFmt   = ( aType1.match( /mediumint/) ) ? 'R07 #,###,##0'           : aFmt
                aFmt   = ( aType1.match( /bigint/   ) ) ? 'R19 ##################0' : aFmt
                aFmt   = ( aType1.match( /double/   ) ) ? `R${aWdt} ${aDec}`        : aFmt  // 15+d+1
                aFmt   = ( aType1.match( /float/    ) ) ? `R${aWdt} ${aDec}`        : aFmt  // 10+d+1
                aFmt   = ( aType1.match( /decimal/  ) ) ? `R${aWdt} ${aDec}`        : aFmt  // 10+d+1
         return aFmt
                }
//      -------------------------------------------------

       function fmtOther(  aKey, aExtra, aNull ) {
            var aOther = ( aKey.match(   /PRI|UNI|MUL/i ) ? ' PRIMARY KEY' : '' )
                aOther = ( aExtra.match( /increment/i   ) ? ' INCREMENT'   : '' ) + aOther
                aOther = ( aNull.match(  /No/i          ) ? ' NOT NULL'    : '' ) + aOther
         return aOther.substr(1)
                }
//      -------------------------------------------------
         }  }  // eof getTableSchema
// -------------------------------------------------------------------------

  function  fmtModel( pModel, q ) {
       var  pCols  = { "ColName(12)" :[ 'DataType(12)', 'Label(16)',        'FormType(12)', 'Format(11)' , 'OtherParms()' ]
                     , "------------":[ "------------", "----------------", "------------", "-----------", "------------" ]
                        }
      if (! pModel.ModelName) {                               // No ModelName or Schema
            pModel = { ModelName: ""
                     , TableName: ""
                     , Schema: { ...pCols, ...pModel }
            }          }
//          --------------------------------------------------

      if (! pModel.Schema[  "ColName(12)"   ] ) {             // No Column Hewadings
            pModel.Schema = { ...pCols, ...pModel.Schema }
            }
//          --------------------------------------------------

       var  pCols = pModel.Schema, b = q != '"'
       var  mCols = Object.keys( pCols )

       var  mWdts = [ mCols[0], ...pCols[ mCols[0] ] ].map( aHD => 1 * aHD.replace( /.+\(/, '').replace( /\).*/, '') )
                      mCols.map( aCol =>  chkWdts( aCol, mWdts ) )
       var  mRows =   mCols.map( aCol => `     , ${ fmtCol( aCol, mWdts ) }\n` )
       var  mLins =   mWdts.map( nWdt => take( nWdt, '', '-') )

       var  aStr = `  { "ModelName": '${pModel.ModelName}'\n`
                 + `  , "TableName": '${pModel.TableName}'\n`
                 + `  , "Schema"   :\n`
                 +    ' ' + mRows[0].replace( /,/, '{' )
                 +    ' ' + mRows.slice(2).join( ' ' )
                 + `     }   }`

     return aStr.replace( /'/g, q ? q : "'" )

//          --------------------------------------------------

   function fmtCol( aColName,  mWdts ) {
        var mParms     = pCols[ aColName ]
        var aStr = '"' + take( mWdts[0]+1,   aColName  + '"' ) + ":[ "
                 + "'" + take( mWdts[1]+1, ( mParms[0] || '' ) + "'" ) + ', '
                 + "'" + take( mWdts[2]+1, ( mParms[1] || '' ) + "'" ) + ', '
                 + "'" + take( mWdts[3]+1, ( mParms[2] || '' ) + "'" ) + ', '
                 + "'" + take( mWdts[4]+1, ( mParms[3] || '' ) + "'" ) + ', '
                 + "'" +                   ( mParms[4] || '' ) + "' ]"
     return aStr // .replace( /,$/, ' ]' )
            } // eof fmtCol
//          --------------------------------------------------

   function chkWdts( aColName, mWdts ) {
        var mParms     =   pCols[ aColName ]
            mWdts[0]   = ( mWdts[0] > aColName. length ) ? mWdts[0] : aColName.length
            mWdts[1]   = ( mWdts[1] > mParms[0].length ) ? mWdts[1] : mParms[0].length
            mWdts[2]   = ( mWdts[2] > mParms[1].length ) ? mWdts[2] : mParms[1].length
            mWdts[3]   = ( mWdts[3] > mParms[2].length ) ? mWdts[3] : mParms[2].length
            mWdts[4]   = ( mWdts[4] > mParms[3].length ) ? mWdts[4] : mParms[3].length
            } // eof chkWdts
//          --------------------------------------------------

   function take(n,a,f) { return n > 0 ? a.substr(0,n).padEnd(n,f) : a.substr(0,-n).padStart(-n,f) }

            } // eof fmtModel
// -------------------------------------------------------------------------

   function savModelScript( pModel ) {

        var aModelName   = pModel.ModelName
        var pSchema      = pModel.Schema
        var mPrimaryCols = Object.keys( pSchema ).filter( aCol => pSchema[ aCol][4].match( /PRIMARY/i ) != null )
        var aPrimaryCol  = mPrimaryCols ? mPrimaryCols[ mPrimaryCols.length - 1 ] : ''

// ---------------------------------------------------------------------------

        var aModelScript = `
// -------------------------------------------------------------------

   function setModel( pDB, aTable ) {

        var pSchema =
             {  id         : { type          :  pDB.Sequelize.INTEGER
                             , primaryKey    :  true
                             , autoIncrement :  true
                               }
             ,  username   : { type          :  pDB.Sequelize.STRING }
             ,  email      : { type          :  pDB.Sequelize.STRING }
             ,  password   : { type          :  pDB.Sequelize.STRING }
             ,  active     : { type          :  pDB.Sequelize.STRING }
            }
        var pModel         =   pDB.sequelize.define( aTable, pSchema );
            pModel.DBSN    =   pDB.sequelize.config.DBSN
            pModel.Primary =  'username'
     return pModel

     }; // eof setModel
// -------------------------------------------------------------------

     module.exports = setModel
`
// ----------------------------------------------

        var aModelScript = `

        var pModel = ${ "\n       " + fmtModel( pModel ).replace( /\n/g, "\n       " ) }

// -------------------------------------------------------------------

   function setModel( pDB, aTable ) {

        var pSchema =
             ${ fmtSequelizeColumns( pSchema ) }
                }
        var pModel          =   pDB.sequelize.define( aTable, pSchema );
            pModel.DBSN     =   pDB.sequelize.config.DBSN
            pModel.Primary  =  '${ aPrimaryCol }'
     return pModel

     }; // eof setModel
// -------------------------------------------------------------------

     module.exports = setModel
`
// ---------------------------------------------------------------------------

            writeFile( `${aModelName}.model.js`, aModelScript )

//          ----------------------------------------------------------

   function fmtSequelizeColumns( pSchema ) {

        var mSchema = Object.entries( pSchema ).map( ( [ aCol, mParms ] ) =>
            fmtSequelizeColumn( aCol, mParms[2] ) )
     return mSchema.join( take( 13, '' ) ).replace( /,/, "{" ).replace( /\n$/, '' )

//          -------------------------------------------------

   function fmtSequelizeColumn( aCol, aType2 ) {

        if (aType2.match( /id/ )) { var aFill = take( 29, '' )
    return `,  ${ take( 12, aCol ) }: { type          :  pDB.Sequelize.INTEGER\n`
                        + `${ aFill } , primaryKey    :  true\n`
                        + `${ aFill } , autoIncrement :  true\n`
                        + `${ aFill }   }\n`
            } // eif aType2 == 'id'
//          ------------------------------------------

        if (aType2.match( /text/ )) {
    return `,  ${ take( 12, aCol ) }: { type          :  pDB.Sequelize.STRING }\n`

            } // eif aType2 == 'text'
//          ------------------------------------------

        if (aType2.match( /number/ )) {
    return `,  ${ take( 12, aCol ) }: { type          :  pDB.Sequelize.INTEGER }\n`

            } // eif aType2 == 'integer'
//          ------------------------------------------

        if (aType2.match( /date/ )) {
    return `,  ${ take( 12, aCol ) }: { type          :  pDB.Sequelize.DATE }\n`

            } // eif aType2 == 'date'
//          ------------------------------------------

    return `,  ${ take( 12, aCol ) }: { type          :  pDB.Sequelize.STRING }\n`

            } // eof fmtSequelizeColumn
//          -------------------------------------------------
            } // eof fmtSequelizeColumns
//          ----------------------------------------------------------
            } // eof savModelScript
// -----------------------------------------------------------------------------------------

   function take(n,a,f) { return n > 0 ? a.substr(0,n).padEnd(n,f) : a.substr(0,-n).padStart(-n,f) }

   function writeFile( aFile, aData ) {
        var __dirname = process.argv[1].split( /[\/\\]/ ).slice(0,-1).join( '/' )
            require( 'fs' ).writeFileSync( `${__dirname}/${aFile}`, aData, 'ASCII' )
            }

   function readFile( aFile ) {
        var __dirname = process.argv[1].split( /[\/\\]/ ).slice(0,-1).join( '/' )
     return require( 'fs' ).readFileSync(  `${__dirname}/${aFile}`,        'ASCII' )
           }

   function killFile( aFile ) {
        var __dirname = process.argv[1].split( /[\/\\]/ ).slice(0,-1).join( '/' )
     return require( 'fs' ).unlink( `${__dirname}/${aFile}`, err => err && console.log( err ) )
           }

   function inspect( pObj ) { return require( 'util' ).inspect( pObj, { depth: 99 } ) }

   function doTest( n ) {
        var bCalled = (__filename != process.mainModule.filename)
        if (bCalled || typeof( aTests ) == 'undefined') { aTests = ',,' } else { aTests = ',' + aTests + ','}
     return aTests.match( `,${n},` )
            }
// -----------------------------------------------------------------------------------------
