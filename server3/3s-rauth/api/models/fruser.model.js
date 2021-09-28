
        var pJSON =                                                                     // .(10903.01.1 RAM Was pModel)                     
         { "ModelName"       : 'fruser'
         , "TableName"       : 'users'
         , "FormR_Schema"    :                                                          // .(10903.01.2 RAM Was Schema)  
             { "ColName(12)" :[ 'DataType(12)', 'Label(16)'       , 'FormType(12)', 'Format(23)'             , 'OtherParms()' ]
             , "id"          :[ 'int'         , "Id"              , 'id'          , 'R10'                    , 'NOT NULL INCREMENT PRIMARY KEY' ]
             , "username"    :[ 'varchar(255)', "Username"        , 'text'        , 'L255'                   , '' ]
             , "email"       :[ 'varchar(255)', "Email"           , 'email'       , 'L40'                    , '' ]
             , "password"    :[ 'varchar(255)', "Password"        , 'password'    , 'L25'                    , '' ]
             , "active"      :[ 'varchar(3)'  , "Active"          , 'text'        , 'L03'                    , '' ]
             , "group"       :[ 'varchar(100)', "Group"           , 'text'        , 'L100'                   , '' ]
             , "role"        :[ 'varchar(45)' , "Role"            , 'text'        , 'L45'                    , '' ]
             , "passworddate":[ 'varchar(10)' , "Password Date"   , 'test'        , 'L10'                    , '' ]
             , "createdAt"   :[ 'timestamp'   , "CreatedAt"       , 'timestamp'   , 'R19 yyyy-mm-dd hh:mm:ss', 'NOT NULL' ]
             , "updatedAt"   :[ 'timestamp'   , "UpdatedAt"       , 'timestamp'   , 'R19 yyyy-mm-dd hh:mm:ss', 'NOT NULL' ]
                }
         , "HelpMessages"    :
             { "id"          :  "User's Primary Key" 
             , "username"    :  "User's User ID" 
             , "email"       :  "User's Email Address" 
             , "password"    :  "User's Password" 
             , "group"       :  "User's Group" 
             , "role"        :  "User's Role" 
             , "active"      :  "User is Active (Yes/No)" 
             , "passworddate":  "Date of Last Password Change" 
             , "createdAt"   :  "Date User was Created" 
             , "updatedAt"   :  "Date User was Last Updated" 
                }
            }
// -------------------------------------------------------------------

   function setModel( pDB, aTable ) {

        var pSchema          =
             {  id           : { type          :  pDB.Sequelize.INTEGER
                               , primaryKey    :  true
                               , autoIncrement :  true
                                 }
             ,  username     : { type          :  pDB.Sequelize.STRING }
             ,  email        : { type          :  pDB.Sequelize.STRING }
             ,  password     : { type          :  pDB.Sequelize.STRING }
             ,  active       : { type          :  pDB.Sequelize.STRING }
             ,  group        : { type          :  pDB.Sequelize.STRING }
             ,  role         : { type          :  pDB.Sequelize.STRING }
             ,  passworddate : { type          :  pDB.Sequelize.STRING }
             ,  createdAt    : { type          :  pDB.Sequelize.DATE   }
             ,  updatedAt    : { type          :  pDB.Sequelize.DATE   }
                }

        var pModel           =   pDB.sequelize.define( aTable, pSchema );
            pModel.DBSN      =   pDB.sequelize.config.DBSN
            pModel.Primary   =  'id'
            pModel.ToSearch  =  'username'                                              // .(10917.08.2 RAM) 
            pModel.RSchema   = { ModelName     :  pJSON.ModelName                       // .(10903.01.3 Beg RAM Get a Live version)
                               , TableName     :  pJSON.TableName
                               , FormR_DBSN    :  pModel.DBSN
                               , FormR_Schema  :  pJSON.FormR_Schema
                               , HelpMessages  :  pJSON.HelpMessages  
                                 }                                                      // .(10903.01.3 End)
     return pModel

            }; // eof setModel
// -------------------------------------------------------------------

     module.exports          =   setModel
