// --------------------------------------------------------------------------------------------------------

//          FormR           =  require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
        var FormR           =  require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
            FormR.init(      __dirname, __filename );       //  FormR.help(); process.exit()                                    

//      var pFns            =   require( '../routes/_route.fns.njs' ).fns                                   //#.(10328.06.9) 
        var pFns            =   require( `${FORMRs_4}/route.fns.njs` ).fns                                  // .(10328.06.9 RAM Moved again) 

//      --------------------------------------------------------------------------------------------------

        var aTable          =  'formr/roles'
        var aModel          =  'frrole'

        var aFName          =  `${aModel}.controllers`
        var aPrimaryCol     =  'name'

        var pConfig         = { ControllersFilename: __filename }
            pConfig.Cmd     =  'replace default controllers'

//      var pModel          =   require( `${FORMRs_4_API}/models/index.js` )[ aModel ]                      //#.(10414.02.8)
        var pModel          =   require(              '../models/index.js' )[ aModel ]                      // .(10414.02.8)








        var Op              =   require( 'sequelize' ).Op;

//      --------------------------------------------------------------------------------------------------

        var pRoutes =  //    { aRoute                            : [ aRoles,    aController ] = mControllerRoles }
//                  Method      Route                                 Roles      Controller
//                -----------  --------------------------------       -------    --------------------
               { 'http.get     /api/${aTable}/model/           ' : [ '      I', 'getModel            ' ]
               , 'http.get     /api/${aTable}/                 ' : [ '      I', 'findAll             ' ]    // .(10314.08.1 RAM Add Controllera for React-Admin)
               , 'http.get     /api/${aTable}/:id              ' : [ '      I', 'findOne             ' ]    // .(10314.08.3)
               , 'http.post    /api/${aTable}/                 ' : [ '      I', 'createOne           ' ]    // .(10314.08.3)
               , 'http.put     /api/${aTable}/:id              ' : [ '      I', 'updateOne           ' ]    // .(10314.08.5)
               , 'http.delete  /api/${aTable}/:id              ' : [ '      I', 'deleteOne           ' ]    // .(10314.08.7)
                  }
//      --------------------------------------------------------------------------------------------------

        var pControllers    = { controller1 : {}

//          ----------------------------------------------------------------------------------

          , getModel        :  function getModel( req, res ) { trace( `${aModel}.model` )
//      var pModel          =  require( 'fs' ).readFileSync( `${APP_HOME}/api/models/${aModel}.model.json`, 'ASCII' ) // .(10311.06.1 RAM ).(10316.04.1 RAM Use APP_HOME instead of APP_DIR).(10329.01.1)
//      var aModel          =  require( 'fs' ).readFileSync( `${APP_HOME}/api/models/role.model.json`,      'ASCII' ) // .(10316.02.1 RAM ).(10328.06.11).(10329.01.1 RAM Don't use variable).(10414.04.2)
//      var aModel_JSON     =  require( 'fs' ).readFileSync( `${APP_HOME}/api/models/${aModel}.model.json`, 'ASCII' ) // .(10414.04.2 RAM Use frrole to be conistent. Or it could be ${aModel} as it was).(10903.01.1)
//          aModel_JSON     =  aModel_JSON.replace( /, +"Schema"/, `, "DBSN": "${ pModel.DBSN }", "Schema"` )         //#.(10903.01.1 RAM Add DBName)
        var aModel_JSON     =  JSON.stringify( pModel.RSchema )                                                       // .(10903.01.1 RAM Get a Live version)

                               res.json( JSON.parse( aModel_JSON ) )                                                  // .(10414.04.4 RAM Gotcha: var aModel = `{aModel} is undefined)

                } // eof `${aFName}.getModel`
//          ------------------------------------------------------------------

          , createOne       :  function createOne( req, res ) { trace( ` ${req.body.name}` )                    // .(10315.12.1 Beg RAM Added)

       if (!req.body[ aPrimaryCol ]) {                                                                          //  Validate request
                               res.status(400).send( { message: "Primary column, ${aPrimaryCol}, can not be empty!" } );
            return
            }
      const pData           =                                                                                   //  Create one
             {  name        :  req.body.name
                };

            pModel.create( pData )
     .then( pData => {
                               res.send( pData ); })
    .catch( pErr  => {
                               res.status(500).send( { message: pErr.message || "Some error occurred while creating the user." } ); } )

             } // eof createOne
//          ------------------------------------------------------------------

//    Retrieve all users from the database.
//    -----------------------------------------------------------------------------------------

          , findAll         :  function findAll( req, res ) { trace( )                                          // .(10314.08.2 RAM Add Controller for React-Admin)

      const pCondition  = { }
      const aPrimaryVal =  req.query[   aPrimaryCol ];                                                          // .(10109.03.4)
        if (aPrimaryVal) { pCondition[  aPrimaryCol ]  = { [Op.like]: `%${aPrimaryVal}%` } }

      const aTable     =   req.originalUrl.replace( /\?.+$/, '').replace( /\/api\//, '')                        // .(10107.01.1 Beg RAM Ass Sort, range and filter)

        var mRange     = ( req.query.range || '').replace( /[\[\]]/g,  '' ).split( ',' )
        var mSort      = ( req.query.sort  || '').replace( /[\[\]"]/g, '' ).split( ',' )                        // .(10110.04.1 RAM e.g. '["username","ASC"]')
        var pOrder     = ( req.query.sort ) ? [ mSort ] : [ ]                                                   // .(10119.01.1)

        var pOptions   = { where: pCondition, order: pOrder }                                                   // .(10119.01.2 RAM Was: [ mSort ])
        var nOffset    = ( mRange[0] ||  0 ) * 1                                                                // .(10111.01.1 RAM Support Pagination)
        var nLimit     = ( mRange[1] || 99 ) * 1; nLimit = (nLimit - nOffset) + 1                               // .(10111.01.2)

            pModel.findAndCountAll( { offset: nOffset, limit: nLimit, ...pOptions } )                           // .(10111.01.2)

     .then( pData => { var nBeg  =  mRange[0] || 0, nEnd = mRange[1] || pData.rows.length, nCnt = pData.count   // .(10103.01.3 RAM Get range counts)
                           res.setHeader('Access-Control-Expose-Headers', 'Content-Range'   );                  // .(10103.05.1 RAM Allow use of 'Content-Range' Header)
                           res.setHeader('Accept-Ranges', `${aTable}`                         );                // .(10103.01.4 RAM Both are require for browser, ie. Chrome)
                           res.setHeader('Content-Range', `${aTable} ${nBeg}-${nEnd}/${nCnt}` );                // .(10103.01.5 RAM Send Header)
                           res.send( pData.rows )                                                               // .(10111.01.3 RAM added data.rows)
                           } )
     .catch( pErr => {
                           res.status(500).send( { message: pErr.message || "Some error occurred while retrieving users." } ); } );

             } // eof findAll
//          ------------------------------------------------------------------

//    Find a single user with an id
//    -----------------------------------------------------------------------------------------

          , findOne    :   function findOne( req, res ) { trace( )                                              // .(10314.08.4 RAM Add FindOne Controller for React-Admin)

        var id         =   req.params.id;

            pModel.findByPk( id )
     .then( pData  => {
                                       res.send( pData ); } )
    .catch( pErr   => {
                           res.status(500).send( { message: `Error retrieving id: ${id}` } ); } );
            } // eof findAll
//          ------------------------------------------------------------------

//    Put (aka UpdateOne) Controller
//    -----------------------------------------------------------------------------------------

          , updateOne  :   function updateOne( req, res ) { trace( )                                         // .(10314.08.6 RAM Add UpdateOne Controller for React-Admin)

        var id         =   req.params.id;
        if (req.body.id) { delete req.body.id }                                                              // .(10315.013.1 RAM id can't be part of body)

            pModel.update( req.body, { where: { id: id } } )
     .then( ( )   => { return pModel.findByPk( id )      } )
     .then( pData => {
                           res.send( pData );            } )
    .catch( pErr  => {
                           res.status(500).send( { message: `Error updating id: ${id}.\n ${pErr}` } ); } );
            } // eof updateOne
//          ------------------------------------------------------------------

//    Delete Controller
//    -----------------------------------------------------------------------------------------

          , deleteOne   :  function deleteOne( req, res ) { trace( )                                          // .(10314.08.8 RAM Add DeleteOne Controller for React-Admin)

        var id         =   req.params.id;

            pModel.destroy( { where: { id: id } } )                                                           // .(01106.06.2)
     .then( nNum  => { if (nNum == 1) {
                           res.send( { message: `User ${id} was deleted successfully!` } );
                        } else {
                           res.send( { message: `Cannot delete id = ${id}. Maybe user was not found!` } ); } } )
    .catch( pErr  => {
                           res.status(500).send( { message: `Could not delete id: ${id}` } ); } );
            } // eof deleteOne
//          ------------------------------------------------------------------

//    Action Controller
//    -----------------------------------------------------------------------------------------

          , action     :  function action( req, res ) { trace( )                                              // .(10314.08.9 RAM Add Action Controller for React-Admin)

        var id         =   req.params.id;

            pModel.findByPk( id )
     .then( pData  => {
                                      res.send( pData ); } )
    .catch( pErr   => {
                          res.status(500).send( { message: `Error retrieving id: ${id}` } ); } );
            } // eof action
//          ------------------------------------------------------------------

            }  // eoo pControllers
//      --------------------------------------------------------------------------------------------------

          module.exports    =
             {  TableName   :   aTable
             ,  ModelName   :   aModel
             ,  Routes      :   pRoutes
             ,  Controllers :   pControllers
             ,  Options     :   pConfig                                   // .(10301.03.3)
                }

                trace(  "\nmodule.exports" )

// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------

          nDoTests        =   1

      if (doTest( 1, __filename )) {   // Format and possible redefine Controllers and Routes in pTableRoutes

//    var { getControllers }  =  require( '../Controllers/_controller.fns.njs'  ).fns
//    var { setTableRoutes }  =  require( '../Routes/_route.fns.njs'            ).fns
      var { getControllers }  =  require( `${FORMRs_4}/controller.fns.njs`  ).fns                       // .(10318.02.7).(10328.06.12)
      var { setTableRoutes }  =  require( `${FORMRs_4}/route.fns.njs`       ).fns                       // .(10318.02.8).(10328.06.12)

            pTableRoutes      =  getControllers( module.exports, 'showem' )
                                 setTableRoutes( pTableRoutes, aTable, 'ShowEm' )
            }
//    ---   ------------------------------------------------------------------
