//FileName: ./ServerN/appNs/api/controllers/frrole.controllers 
// --------------------------------------------------------------------------------------------------------

//          FormR           =  require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
        var FormR           =  require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
            FormR.init(      __dirname, __filename );       //  FormR.help(); process.exit()                                    

//      --------------------------------------------------------------------------------------------------

        var aTable          =  'formr/roles'
//      var aTable          =  'roles'
        var aModel          =  'frrole'
//      var aPrimaryCol     =  'name'                                                                       //#.(10328.01.7)

        var pConfig         ={ ControllersFilename: __filename }                                            // .(10301.03.1 RAM Let's try saving the file name)
//          pConfig.Cmd     = 'replace default controllers'                                                 //#.(10301.03.2 RAM Replace the default Controller Routes).(10918.02.7)
//          pConfig.Cmd     = `replace default controllers, then use ${aModel} controllers`                 // .(10918.02.7 RAM if not set here, see .env, otherwise it defaults to 'use')

//      --------------------------------------------------------------------------------------------------

        var pRoutes =  //    { aRoute                            : [ aRoles,    aController ] = mControllerRoles }
//                  Method      Route                                 Roles      Controller
//                -----------  --------------------------------       -------    --------------------
               { 'http.get     /api/${aTable}/                 ' : [ '      I', 'findAll             ' ]    // .(10314.08.1 RAM Add Controllera for React-Admin)
//             , 'http.get     /api/${aTable}/model/           ' : [ 'A - - -', 'getModel            ' ]    //   Retrieve schema model    .(10905.08.5 RAM Use default model controller)
//             , 'http.get     /api/${aTable}/test/            ' : [ '      E', 'test                ' ]    // .(10917.09.1 RAM Let's test this controller)
               , 'http.get     /api/${aTable}/:id              ' : [ '      I', 'findOne             ' ]    // .(10314.08.3)
               , 'http.post    /api/${aTable}/                 ' : [ '      I', 'createOne           ' ]    // .(10314.08.3)
               , 'http.put     /api/${aTable}/:id              ' : [ '      I', 'updateOne           ' ]    // .(10314.08.5)
               , 'http.delete  /api/${aTable}/:id              ' : [ '      I', 'deleteOne           ' ]    // .(10314.08.7)
                  }
//      --------------------------------------------------------------------------------------------------

        var pDB             =  require( '../models/index.js' )                                              // .(10328.01.4 Beg RAM Needed now) 
        var pModel          =  pDB[ aModel ]                                                                // .(10328.02.6 RAM Each model is defined in pDB).(10328.01.5).(10414.02.8)
        var aFName          = `${aModel}.controllers`
        var aPrimaryCol     = (pModel && pModel.Primary) || 'id'                                            // .(10328.01.7 End).(10328.03.2 RAM In case aModel is undefined).(10418.07.1 RAM Added Default)
        var aColToSearch    =  pModel && pModel.ToSearch || ''                                              // .(10418.03.1 RAM Different than PrimaryID Column)

//      var Op              =  require( '../models/index.js' ).Sequelize.Op;                                //#.(10228.03.3 RAM Was: db.Sequelize.Op).(10310.01.4)
        var Op              =  require( 'sequelize' ).Op;                                                   // .(10103.03.3).(10314.08.4).(10328.01.6) 

//          ------------------------------------------------------------------------------------------

        var pControllers    = { 

//          controller1     : { }                                                                           //#.(10328.02.3 RAM Added Table and Model. Cute).(10917.06.1)
            _frroleController : { Table: aDefault, Model: aModel }                                          // .(10917.06.1 RAM Identify yourself)

//          ----------------------------------------------------------------------------------

//        , getModel        :  function getModel( req, res ) { trace( `${aModel}.model` )                   // .(10905.08.2 RAM Add getModel to _this.controllers.njs file)
//
//      var aModel_JSON     =  require( 'fs' ).readFileSync( `${APP_HOME}/api/models/${aModel}.model.json`, 'ASCII' ) //#.(10414.04.2 RAM Use frrole to be conistent. Or it could be ${aModel} as it was).(10903.01.1)
//      var aModel_JSON     =  JSON.stringify( pModel.RSchema )                                             // .(10903.01.1 RAM Get a Live version)
//      if (aModel_JSON) {                                                                                  // .(10918.05.1) 
//                             res.json( JSON.parse( aModel_JSON ) )                                        // .(10414.04.4 RAM Gotcha: var aModel = `{aModel} is undefined).(10903.01.2)
//      } else {                                                                                            // .(10918.05.2 Beg) 
//                             sndError( pErr, `Error occurred while getting model for table ${aModel}.`, res ) 
//                             res.send( `There is no pModel.RSchema defined for this model, '${aModel}''`) // .(10414.04.4 RAM Gotcha: var aModel = `{aModel} is undefined).(10903.01.2)
//          }                                                                                               // .(10918.05.2 End) 
//          } // eof `${aFName}.getModel`
//          ------------------------------------------------------------------

          , createOne       :  function createOne( req, res ) { trace( `${aModel}.createOne ${req.body[ aColToSearch ]}` )  // .(10315.12.1 Beg RAM Added)

       if (!req.body[ aPrimaryCol ]) {                                                                          //  Validate request
                               res.status(400).send( { message: "Primary column, ${aPrimaryCol}, can not be empty!" } );
            return;
            }
            
      const pBody           =                                                                                   //  Create one
//           { id           :  req.body.id
             { name         :  req.body.name





               };

            pModel.create( pBody )                                                                              // .(10109.03.5 RAM Was UserData, then pData)
     .then( pData => {         pData  =  pData.toJSON( )                                                        // .(10402.01.1 RAM Convert it so that it's easy to view)
                               res.send( pData ); })
    .catch( pErr  => {
                               res.status(500).send( { message: pErr.message || "Some error occurred while creating the user." } ); } )

             } // eof createOne
//          ------------------------------------------------------------------

//    Retrieve all users from the database.
//    -----------------------------------------------------------------------------------------

          , findAll         :  function findAll( req, res ) { trace( ` ${req.query[ aPrimaryCol ] ? req.query[ aPrimaryCol ] : ''}` ) // .(10314.08.2 RAM Add Controller for React-Admin)

      const pCondition  = { }
      const aPrimaryVal =  req.query[   aPrimaryCol ];                                                          // .(10109.03.4)
        if (aPrimaryVal) { pCondition[  aPrimaryCol ]  = { [Op.like]: `%${aPrimaryVal}%` } }

      const aTable     =   req.originalUrl.replace( /\?.+$/, '').replace( /\/api\//, '')                        // .(10107.01.1 Beg RAM Ass Sort, range and filter)

//      var aFilter    =   req.query.filter

        var mRange     = ( req.query.range || '').replace( /[\[\]]/g,  '' ).split( ',' )
        var mSort      = ( req.query.sort  || '').replace( /[\[\]"]/g, '' ).split( ',' )                        // .(10110.04.1 RAM e.g. '["username","ASC"]')
        var pOrder     = ( req.query.sort ) ? [ mSort ] : [ ]                                                   // .(10119.01.1)

        var pOptions   = { where: pCondition, order: pOrder }                                                   // .(10119.01.2 RAM Was: [ mSort ])
        var nOffset    = ( mRange[0] ||  0 ) * 1                                                                // .(10111.01.1 RAM Support Pagination)
        var nLimit     = ( mRange[1] || 99 ) * 1; nLimit = (nLimit - nOffset) + 1                               // .(10111.01.2)

            pModel.findAndCountAll( { offset: nOffset, limit: nLimit, ...pOptions } )                           // .(10111.01.2)

     .then( pData => { 
                       var nBeg  =  mRange[0] || 0, nEnd = mRange[1] || pData.rows.length, nCnt = pData.count   // .(10103.01.3 RAM Get range counts)
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

          , findOne    :   function findOne( req, res ) {  trace( ` ${req.params.id}` )                         // .(10314.08.4 RAM Add FindOne Controller for React-Admin)

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

          , updateOne  :   function updateOne( req, res ) { trace( ` ${req.params.id}` )                        // .(10314.08.6 RAM Add UpdateOne Controller for React-Admin)

        var id         =   req.params.id;
        if (req.body.id) { delete req.body.id }                                                                 // .(10315.13.1 RAM id can't be part of body)

            pModel.update( req.body, { where: { id: id } } )
     .then( ( )   => { return pModel.findByPk( id )      } )
     .then( pData => {
                           res.send( pData.toJSON() );   } )                                                    // .(10315.14.1 RAM Added .toJSON())
    .catch( pErr  => {
                           res.status(500).send( { message: `Error updating id: ${id}.\n ${pErr}` } ); } );
            } // eof updateOne
//          ------------------------------------------------------------------

//    Delete Controller
//    -----------------------------------------------------------------------------------------

, deleteOne : function deleteOne( req, res ) { trace( ` ${req.params.id}` )                                     // .(10314.08.8 RAM Add DeleteOne Controller for React-Admin)

        var id         =   req.params.id;

            pModel.destroy( { where: { id: id } } )                                                             // .(01106.06.2)
     .then( nNum  => { if (nNum == 1) {
                           res.send( { message: `User ${id} was deleted successfully!` } );
                        } else {
                           res.send( { message: `Cannot delete id = ${id}. Maybe user was not found!` } ); } } )
    .catch( pErr  => {
                           res.status(500).send( { message: `Could not delete id: ${id}` } ); } );
            } // eof deleteOne
//          ------------------------------------------------------------------

//    Test Controller
//    -----------------------------------------------------------------------------------------

, test : function( req, res ) { trace( '' )                                                                     // .(10917.09.2 Beg RAM Create test controller)

            res.status(  200 ).send(  `Test response from: '${ __filename.replace( /[\/\\]/g, '/' ).replace( /.+\/server/, './server' ) }'.` ); 
                               return 
            } // eof test                                                                                       // .(10917.09.2 End)                                                                         
//          ------------------------------------------------------------------

//    Action Controller
//    -----------------------------------------------------------------------------------------

, action : function action( req, res ) { trace( ` ${req.params.id}` )                                           // .(10314.08.9 RAM Add Sample Action Controller for React-Admin)

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

      var { getControllers }  =  require( `${FORMRs_4}/controller.fns.njs`  ).fns                       // .(10318.02.7).(10328.06.12)
      var { setTableRoutes }  =  require( `${FORMRs_4}/route.fns.njs`       ).fns                       // .(10318.02.8).(10328.06.12)

            pTableRoutes      =  getControllers( module.exports, 'showem' )
                                 setTableRoutes( pTableRoutes, aTable, 'ShowEm' )                       // .(10318.04.2 RAM Was: aTable)
            }
//    ---   ------------------------------------------------------------------
