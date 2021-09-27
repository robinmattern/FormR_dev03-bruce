
        FORMR_HOME         = `${ process.env.FORMR_HOME }`
        FORMRs_3           = `${ process.env.FORMR_HOME }/_3/FR.FNSs/`                        // .(10317.01.1 RAM FormR's Home) 
        jstUtils  = require( `${ process.env.FORMR_HOME }/_3/NJSs/JScripts2.3.njs` )       // .(10228.11.1 RAM Add global utility fns).(10314.02.1 RAM If global you can use anywhere while debugging)
        FORMRs_4           = `${ APP_HOME.replace( /[\\/]app[0-9]+[sc]/i, '' ) }/_4/FR.fns02s/` // .(10317.01.1 RAM Server's Home if dynamically assigned) 
        APP_HOME           = `${ jstUtils.setEnv( __dirname ) }/app08s`                    // .(10319.06.1 RAM Necessary when run in FORMRs_4)
//      APP_HOME           = `${ jstUtils.setEnv(  FORMRs_4 ) }/app08s`                    // .(10319.06.1 RAM Necessary when run in FORMRs_4)
//                               jstUtils.setEnv(  )                                       //#.(10317.03.8 RAM Only necessary if you need process.env vars to be read from .env)
                                 trace( 'setProjectName', 'FormR'  )

        FORMRs_4           = `${ FORMR_HOME }/server3/_4/FR.fns02s/`                            // .(10325.04.2 RAM Gotta know which server folder)

    var savModelScripts = require( `${FORMR_HOME}/docs/scripts/saveModelScripts.njs` )

//  ---------------------------------------------------------------------------------------

        nDoTests           =  2  
    if (doTest( 1, __filename )) {
  
//      process.env.DBSN = 'MySQL_AWS_WORLD'
//      process.env.DBSN = 'MySQL_AWS_IO'
    var mTables = [ 'users', 'roles', 'tutorials' ]
        savModelScripts( 'MySQL_AWS_IO', mTables )
        }


    if (doTest( 2, __filename )) {

        savModelScripts( 'MySQL_AWS_WORLD', '')
        }
 


