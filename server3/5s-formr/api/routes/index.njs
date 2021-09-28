// -------------------------------------------------------------------------------------

//          FormR       =  require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
        var FormR       =  require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
            FormR.init(  __dirname, __filename );       //  FormR.help(); process.exit()

//          FormR.setEnv( )                                                             // .(10317.03.8 RAM Only necessary if you need process.env vars to be read from .env)

// -------------------------------------------------------------------------------------

        var pRouter     =  require( 'express').Router()                                 // .(10405.03.1 RAM Beg Create an index script for multiple DB routes)

//      var aAppRs      = `${FORMRs_4_API}`                                             // .(109017.02.1 RAM Prepare for use of default formr App)
        var mApps       =  getAppFolders('s')                                           // .(109017.02.2 RAM Prepare for use of different Apps).(10921.01.1 RAM Add function getAppFolders)

//          pRouter.use(   require( `${FORMRs_4_API}/routes/formr.routes.njs` ) )       //#.(10414.02.11 RAM This sets up the FORMR App in the hidden location).(109017.02.5)
//          pRouter.use(   require( `${aApps[0]}/routes/index.njs` ) )                  // .(10414.02.11 RAM This sets up the FORMR App in the hidden location).(109017.02.5).(10921.01.3 Beg)
            pRouter.use(   require( `${mApps[5]}/routes/world.routes.njs` ) )           // .(10917.02.8)
            pRouter.use(   require( `${mApps[5]}/routes/rauth.routes.njs` ) )           // .(10917.01.2  RAM Use seperate script).(109017.02.6)
            pRouter.use(   require( `${mApps[5]}/routes/admin.routes.njs` ) )           // .(10917.01.3  RAM Use seperate script).(109017.02.7)
//          pRouter.use(   require( `${mApps[5]}/routes/iodd.routes.njs`  ) )           // .(10917.02.9).(10921.01.3 End)

// -------------------------------------------------------------------------------------

  function  getAppFolders(a) {                                                          // .(10921.01.3 Beg)
       var  aAppType  =  process.env.APP_FOLDER_TYPE
            aAppType  =  aAppType ? aAppType.replace( / /g, '' ) : 'appNs'
       var  mAppNames =['formr4', 'world','setdb','rauth','admin','formr' ]
    return  mApps     =  mAppNames.map( getAppFolder )
   function getAppFolder( aName, i ) {
       if (       i  ==  0       ) { return `${FORMRs_4_API}`                }
       if (aAppType  == 'Ns-name') { return `../../../${i}${a}-${aName}/api` }
       if (aAppType  == 'name-Ns') { return `../../../${aName}-${i}${a}/api` }
       if (aAppType  == 'appNs'  ) { return `../../../app${i}${a}/api`       }
        }   }                                                                           // .(10921.01.3 End)
//          ------------------------------------------------------------------

     module.exports     =  pRouter                                                      // .(10405.03.1 End)

// ------------------------------------------------------------------------------------------------------------------------------------

            nDoTests    =  1   // shoRoutes

        if (doTest( 1, __filename )) {

            FormR.shoRoutes( module.exports )
            }
//          ------------------------------------------------------

// ------------------------------------------------------------------------------------------------------------------------------------
