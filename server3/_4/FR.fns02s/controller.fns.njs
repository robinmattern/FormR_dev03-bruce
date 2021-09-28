
      var { fixTableRoutes }    =  require( './route.fns.njs' ).fns    // .(10327.04.3 RAM They are now in the same folder.  Was '../Routes/_route.fns.njs' )
      var { getTableRoutes }    =  require( './route.fns.njs' ).fns    // .(10327.04.4)

            pTableRoutes        =  { }
            pDefaultOptions     =  { Cmd: '' }
            TheControllersName  = 'controllers'    // .(10319.13.1 RAM It's not used everywere)

            aDefault            =  '_default'      // .(10329.04.1 RAM Make it a variable)
//          aDefault            = '_database'
//          aDatabase             '_database'

      var   pControllerFns      = { fns:                                                                                        // .(10329.03.1 RAM Make it easier to know what is being returned)
// ----------------------------------------------------------------------------

   { getControllers : function( pModule, aShowEm ) {  trace( )                                                                  // called by routes.njs or ${aTable}.controllers.njs

        if (typeof(pModule) == 'string') {                                                                                      // .(10414.03.RAM *** This won't work for the FormR app )
        
        var reModel          =  new RegExp( `${pModule}.controllers?[^_]\.n?js`)
 
//      var aControllerFile  =  pModule.replace( /.+Controllers\//, ''          )                                               // controller file is always in Controllers folders
//          aControllerFile  =  aControllerFile.replace( /\.controllers.n?js/, '' )                                             // controller file always ends with 'controllers.njs'
//          aControllerFile  = `../controllers/${aControllerFile}.controllers.njs`

//      var mControllerFiles =  require('fs').readdirSync( process.argv[1].replace( /[\\\/]routes.+/, '/controllers') )          // .(10301.03.3 RAm Search controllers folder for '${aModel}.controller.n*js')
//      var mControllerFiles =  require('fs').readdirSync( `../controllers` )                                                    // .(10301.03.3 RAM Search controllers folder for '${aModel}.controller.n*js')
//      var mControllerFiles =  require('fs').readdirSync( `${BRANCH_HOME}/${APP_DIR}/api/controllers` )                         // .(10301.03.3 RAM Search controllers folder for '${aModel}.controller.n*js')
        var mControllerFiles =  require('fs').readdirSync( `${APP_HOME_API}/controllers` )                                       // .(10301.03.3 RAM Search controllers folder for '${aModel}.controller.n*js').(10316.04.2 RAM Use APP_HOME)
//      var aControllersFile =  mControllerFiles.filter( aFile  => aFile.match( new RegExp( `${pModule}.controllers[^_].+`) ) )  //#.(10303.13.1 RAM Don't find old versions).(10316.04.2)
        var aControllersFile =  mControllerFiles.filter( aFile  => aFile.match( reModel ) )                                      // .(10303.13.1 RAM Don't match old versions).(10316.04.2 RAM Move it to above)
//          pModule          =  require(              `../controllers/${aControllersFile[0]}` )                                  //#.(10327.04.5)
            pModule          =  require( `${APP_HOME_API}/controllers/${aControllersFile[0]}` )                                  // .(10327.04.5)
            }
//          ----------------------------------------------------------------

//          pDefaultOptions  ={ Cmd: '', ControllersFilename: '../controllers/_default.controllers.njs' }                        //#.(10301.03.3).(10318.02.9)
//          pDefaultOptions  ={ Cmd: '', ControllersFilename: `${FORMRs_4}/FMR_default.controllers.njs` }                        // .(10301.03.3).(10318.02.9)
            pDefaultOptions  ={ Cmd: '', ControllersFilename: `${APP_HOME_API}/controllers/_default.controllers.njs` }           // .(10301.03.3).(10318.02.9)
        if (pModule.Options  && pModule.Options.ControllersFilename.match( /_4[\\/]FR.app02s/ ) != null) {                       // .(10414.03.1 RAM May never beused, but ... )
            pDefaultOptions  ={ Cmd: '', ControllersFilename: `${FORMRs_4_API}/controllers/_default.controllers.njs` }           // .(10301.03.3).(10318.02.9).(10414.03.2)
            }                                                                                                                    // .(10414.03.3)
//          ----------------------------------------------------------------

//      var aControllersFile =  pModule.options.ControllersFilename                                         // .(10301.03.3)
        var aTable           =  pModule.TableName                                                           // .(10318.04.1 RAM Let's not use aModel for key in pTableRoutes)                                                     
//      var aTable           =  pModule.ModelName  // pModule.TableName                                     //#.(10318.04.1 RAM Let's use aModel for key in pTableRoutes)                                                     
        var aModel           =  pModule.ModelName
        var pRoutes_         =  pModule.Routes
        var pControllers_    =  pModule.Controllers
        var pOptions         =  pModule.Options ? pModule.Options : pDefaultOptions
//          console.log( `\ngetControllers     [1]  aTable: '${aTable}', aModel: '${aModel}', aCmd: '${pOptions.Cmd}', pRoutes.length: ${ Object.keys(pRoutes_).length }, pControllers.length: ${ Object.keys(pControllers_).length } `); // return

//          ----------------------------------------------------------------

        var aUseDefault      = `use default controllers, then use ${aModel} controllers`                    // .(10918.02.1)
       if (!pOptions.Cmd) {                                                                                 // .(10918.02.2 Beg RAM Set {Cmd} if not defined)
        var bUseForModel     =  process.env.DONT_USE_DEFAULT_CONTROLLERS != ''                              // .(10919.01.1 RAM)
        if (process.env.USE_DEFAULT_CONTROLLERS) {   
        var bUseForModel     =  process.env.USE_DEFAULT_CONTROLLERS.match(      new RegExp( `(1|true|${aModel})` ) ) != null
            }
        if (process.env.DONT_USE_DEFAULT_CONTROLLERS) {                                          
        var bDontUseForModel =  process.env.DONT_USE_DEFAULT_CONTROLLERS.match( new RegExp( `(1|true|${aModel})` ) ) != null
        var bUseForModel     =  bDontUseForModel == false
            }
            pOptions.Cmd        =  bUseForModel        ? aUseDefault         : aUseDefault.replace( /use /, 'replace ' )  
            }
            pOptions.Cmd        =  pOptions.Cmd        ? pOptions.Cmd        : aUseDefault  
            pDefaultOptions.Cmd =  pDefaultOptions.Cmd ? pDefaultOptions.Cmd : pOptions.Cmd                 // .(10918.02.2 End)

//          ----------------------------------------------------------------

      if (! pTableRoutes[  aDefault  ] ) {
//          getControllerRoutes(  aDefault  )                                                               // get default controller routes if not in pTableRoutes
//          getControllerRoutes(  aDefault ,  null,    null,      null,   pDefaultOptions )                 // .(10303.03.8 RAM Need _defaultController Filename).(10303.09.1 RAM Don't use empty {})
            getControllerRoutes(  aDefault ,  aModel,  null,      null,   pDefaultOptions )                 // .(10328.01.1 RAM We need to know which model to use for these _default controllers)
            }
            getControllerRoutes(   aTable,    aModel,  pRoutes_,  pControllers_, pOptions )                 // merge controller routes with default controller routes

        if (String(aShowEm).match( /^showset$/i )) {                                                        // .(10315.13.1 RAM Changed from showem)
//          console.log( `getControllers     [9]  pTableRoutes[ '${aTable}' ] = \n`, fmtObj( pTableRoutes[ aTable ] ) )
//          console.log( `\npTableRoutes[ '${aTable}' ] =\n`, fmtObj( pTableRoutes[ aTable ] ) )            //#.(10208.02.1)
//          shoTableRoutes( pTableRoutes, aTable )                                                          // .(10208.02.1)
            require( './route.fns.njs' ).fns.shoTableRoutes( pTableRoutes, aTable )                         // .(10208.02.1)// .(10327.04.15 RAM Was '../Routes/_route.fns.njs' )
            }
     return pTableRoutes

          } // eof getControllers
//        ---------------------------------------------------------------------
          
   , renControllerFns: renControllerFns                                                                     // .(10328.04.5 RAM Needed for _default.contollers) 

        } // eof fns 
//      ----------------------------------------------------------------------------
//   ----------------------------------------------------------------------------------------
     } // eof pControllerFns                                                                                // .(10329.03.2 RAM Was eof module.exports { fns: { ... } }) 

     module.exports = pControllerFns                                                                        // .(10329.03.3) 

// --------------------------------------------------------------------------------------------------------------------------          

// function getControllerRoutes( aTable,  aModel,   pRoutes_, pControllers_, pOptions ) {   trace( )        // called by getControllers above
   function getControllerRoutes( aTable,  aModel_,  pRoutes_, pControllers_, pOptions ) {   trace( )        // .(10328.01.2 RAM The actual model if this is for the _default controllers)
//          aModel              =   aModel        ? aModel  : aTable                                        //#.(10319.08.1 RAM Only works if aModel is passed as '')           
        var aModel              =   pControllers_ ? aModel_ : aTable                                        // .(10319.08.1 RAM Only works if aModel is passed as '').(10328.01.3 RAM pControllers_ is also MT).(10328.03.1 RAM Make aModel local)          
        var aCmd                =   pOptions     && pOptions.Cmd  ? pOptions.Cmd  : ''

        var aControllersFile    =   pOptions.ControllersFilename                                                                        // .(10303.06.2)
//      var pRoutes_            =   pRoutes_      ? pRoutes_      : require( `../Controllers/${aModel}.controllers.njs` ).Routes        // .(10303.06.3)
//      var pControllers_       =   pControllers_ ? pControllers_ : require( `../Controllers/${aModel}.controllers.njs` ).Controllers   // .(10303.06.4).(10327.04.x RAM Could be moved to FORMRs_4)
        var pRoutes_            =   pRoutes_      ? pRoutes_      : require(    aControllersFile ).Routes                               // .(10303.06.3)
        var pControllers_       =   pControllers_ ? pControllers_ : require(    aControllersFile ).Controllers                          // .(10303.06.4)
        var pControllers_       =  ( typeof( pControllers_ ) !=  'function' ) ? pControllers_  :  pControllers_( aModel_ )              // .(10328.01.13 Need to tell _default.controllers the model for it )

            pControllers_       =   chkControllers( aTable, pRoutes_, pControllers_ )                       // check that all routes action names exist as controler functions

        var pControllers        =   { }
        if (aCmd.match(   /'^replace/ ) == null) {                                                          // .(10319.11.2 RAM Beware FName might not be found in chkControllers)
        var pControllers        =   renControllerFns( aModel, pControllers_ )                               // If using _default controllers, change their function names to ActionNames: `${aModel}.controller.${aAction}`
            }

        if (aTable.match(  aDefault )) { aTable = '${aTable}'; aModel = "_default"
//          console.log( `getControllerRoutes[1]  aTable: '${aTable}', aModel: '${aModel}', aCmd: '${aCmd}', pRoutes.length: ${ Object.keys(pRoutes_).length }, pControllers.length: ${ Object.keys(pControllers_).length } `); //#return
//          pTableRoutes[  aDefault  ] = fixTableRoutes( aTable, aModel, pRoutes_, aControllersFile )       //#.(10303.06.5)   // change route keys and controller names in pTableRoutes
            pTableRoutes[  aDefault  ] = fixTableRoutes( aTable, aModel, pRoutes_ )                         // Change route keys and controller names in pTableRoutes
//          console.log( `getControllerRoutes[2]  aTable: '${aTable}', aModel: '${aModel}', aCmd: '${aCmd}', pTableRoutes.length: ${ Object.keys(pTableRoutes).length }`, fmtObj( pTableRoutes) ); //# return
//          pTableRoutes[  aDefault  ].ControllersFile =   aControllersFile                                 //#.(10318.06.1).(10330.01.1)
            pTableRoutes[  aDefault  ].ControllersFile = [ aControllersFile, `${aModel_}, ${aModel}` ]      // .(10330.01.1 RAM Gotta have it for later)
        } else {           
//          console.log( `getControllerRoutes[3]  aTable: '${aTable}', aModel: '${aModel}', aCmd: '${aCmd}', pRoutes.length: ${ Object.keys(pRoutes_).length }, pControllers.length: ${ Object.keys(pControllers_).length } `); //#return
//          pTableRoutes[   aTable   ] = fixTableRoutes( aTable, aModel, pRoutes_, aControllersFile )       // .(10303.06.6)   // change route keys and controller names in pTableRoutes
            pTableRoutes[   aTable   ] = fixTableRoutes( aTable, aModel, pRoutes_ )                         // Change route keys and controller names in pTableRoutes
//          console.log( `getControllerRoutes[4]  aTable: '${aTable}', aModel: '${aModel}', aCmd: '${aCmd}', pTableRoutes.length: ${ Object.keys(pTableRoutes).length }`, fmtObj( pTableRoutes) ); // return
            
            pTableRoutes[   aTable   ] = getTableRoutes( pTableRoutes, aTable, aCmd )                       // Merge default controller routes with table routes
//          pTableRoutes[   aTable   ].ControllersFile =   aControllersFile                                 // .(10318.05.1 RAM Ok, let's save it).(10330.01.2)
            pTableRoutes[   aTable   ].ControllersFile = [ aControllersFile, `${aModel_}, ${aTable}` ]      // .(10330.01.2)
            } 
            } 
//          ---------------------------------------------------------------------

 function chkControllers( aTable, pRoutes, pControllers ) { trace( aTable )
          Object.entries( pRoutes ).forEach( function chkController( [ aRoute, mRoute ] ) {
            if (aRoute     == 'ControllersFile') { return }                                                 // .(10318.06.3 RAM This is what happens when you stick ControllersFile into pTableRoutes)
            var aFName      = (mRoute[1] || '').replace( / /g, '')
            var aFName      =  aFName.replace( /.+controllers*\./, '' )                                     // .(10319.11.1 RAM If the action has been renamed, strip leading `${aMode}.controller.`)
            if (aFName) {                                                                                   // The "remove" route has no controller
            var xController =  pControllers[ aFName ]
            if (typeof( xController ) != 'function' ) {
                console.log( ` ** pControllers[ '${aFName}' ] is not defined for table: '${aTable}'. Creating a dummy function.` )
                xController =  function( req, res, aAction ) { return }
                renFunction(   aFName,    xController )
                pControllers[  aFName ] = xController
                mRoute[ 2 ] = "N/A"
                }
//          console.log( `aRoute: '${aRoute}': ${xController.name}` )
            } } )
     return pControllers
            }
//          ---------------------------------------------------------------------

   function renControllerFns( aModel, pControllers ) { // trace( aModel )
          Object.keys( pControllers ).forEach( function renControllerFn( aFName ) {     // defined controller function name in pControllers
          if (aFName.match( /controller1|config|definition/i )) { return }              // .(10328.04.6 RAM Will I change it's name?)
          var xController =  pControllers[ aFName ]                                     // the actual defined function
//        var aActionName = `${aFName}.${xController.name}`                             // new     controller function name, i.e. ActionName
          var aActionName = `${aModel}.${TheControllersName}.${xController.name}`       // new     controller function name, i.e. ActionName
          if (xController.name) {                                                       // it may not be defined 
//        if (aModel == '_default.controller') {
//            console.log( `** Why are we renaming the controller function '${xController.name}' to '${aActionName}'` ) } 
          if (xController.name.match( `${aModel}.${TheControllersName}` ) ) {           // .(10328.05.1 RAM Not sure why or when)
//            console.log( `** Why are we renaming the controller function '${xController.name}' to the same '${aActionName}'` )
          } else                                                                        // .(10328.05.2)_
              renFunction( aActionName, xController ) }
              } )
     return pControllers
            }
//          ---------------------------------------------------------------------

   function renFunction(  aFName,  xFNC ) {

       try{ Object.defineProperty( xFNC, 'name', { value: aFName, writable: false } ) }
       catch(e) { 
            console.log( e )
            }
            }
//          ---------------------------------------------------------------------
