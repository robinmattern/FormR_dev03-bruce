

        var pJSON =                                                                         // .(10903.01.1 RAM Was pModel, which could not be referenced)                     
         { "ModelName": 'countrylanguage'
         , "TableName": 'countrylanguage'
         , "FormR_Schema"  :                                                                // .(10903.01.2 RAM Was just "Schema")  
             { "ColName(12)" :[ 'DataType(12)', 'Label(16)'       , 'FormType(12)', 'Format(11)' , 'OtherParms()' ]
             , "CountryCode" :[ 'char(3)'     , 'CountryCode'     , 'text'        , 'L03'        , 'NOT NULL PRIMARY KEY' ]
             , "Language"    :[ 'char(30)'    , 'Language'        , 'text'        , 'L30'        , 'NOT NULL PRIMARY KEY' ]
             , "IsOfficial"  :[ 'enum(1)'     , 'IsOfficial'      , 'text'        , 'L01'        , 'NOT NULL' ]
             , "Percentage"  :[ 'float'       , 'Percentage'      , 'decimal'     , 'R20.null .' , 'NOT NULL' ]
            }   }

// -------------------------------------------------------------------

   function setModel( pDB, aTable ) {

        var pSchema =
             {  CountryCode : { type          :  pDB.Sequelize.STRING }
             ,  Language    : { type          :  pDB.Sequelize.STRING }
             ,  IsOfficial  : { type          :  pDB.Sequelize.STRING }
             ,  Percentage  : { type          :  pDB.Sequelize.STRING }
                }
        var pOptions        = { freezeTableName: true                                   // .(10415.01.5 Prevent pural table name)
                              , timestamps     : false                                  // .(10415.02.3)
                                }                                                   
        var pModel          =   pDB.sequelize.define( aTable, pSchema, pOptions );      // .(10415.01.6) 
            pModel.DBSN     =   pDB.sequelize.config.DBSN
            pModel.Primary  =  'Language'
            pModel.RSchema   = { ModelName     :  pJSON.ModelName                       // .(10903.01.3 Beg RAM Get a Live version)
                               , TableName     :  pJSON.TableName
                               , FormR_DBSN    :  pModel.DBSN
                               , FormR_Schema  :  pJSON.FormR_Schema
                               , HelpMessages  :  pJSON.HelpMessages  
                                 }                                                      // .(10903.01.3 End)
     return pModel

     }; // eof setModel
// -------------------------------------------------------------------

     module.exports = setModel
