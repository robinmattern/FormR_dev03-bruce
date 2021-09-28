// --------------------------------------------------------------------------------------------------------

//          FormR           =  require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns.njs` )                            //#.(10418.02.1).(10829.03.1)
        var FormR           =  require( __dirname.replace( /[\\\/](_3|serv|clie).+/, '') + '/_3/FR.FNSs/FormR_Lib.js' )   // .(10829.03.1)
            FormR.init(      __dirname, __filename );       //  FormR.help(); process.exit()                                    

//          FormR.setEnv( )                                                                                 // .(10317.03.8 RAM Only necessary if you need process.env vars to be read from .env)
//      --------------------------------------------------------------------------------------------------

        var aTable          =  'world/countries'                                                            // .(10326.03.1 RAM Add Controller for table)
        var aModel          =  'country'                                                                    // .(10326.03.2).(10418.05.1 RAM Was 'world'. It was very hard to find this bug) 

        var aFName          =  `${aModel}.controllers`

        var pConfig         ={ ControllersFilename: __filename }
//          pConfig.Cmd     = `replace default controllers, then use ${aModel} controllers`                 // .(10918.02.4 RAM if not set here, see .env, otherwise it defaults to 'use')

        var pModel          =  require( '../models/index.js' )[ aModel ]
  
        var aPrimaryCol     =  pModel && pModel.Primary                                                     // .(10328.01.7 End).(10328.03.2 RAM In case aModel is undefined)
        var aColToSearch    =  pModel && pModel.ToSearch                                                    // .(10418.03.1 RAM Different than PrimaryID Column)

        var Op              =  require( 'sequelize' ).Op;

 //     --------------------------------------------------------------------------------------------------

        var pRoutes =  //    { aRoute                            : [ aRoles,    aController ] = mControllerRoles }
//                  Method      Route                                 Roles      Controller
//                -----------  --------------------------------       -------    --------------------
               {       //      Order is important   
//               'http.post    /api/${aTable}/                 ' : [ '      I', 'createOne           ' ]    // .(10326.02.1 RAM Make sure it has the same route as the _default route)
                  }
//      --------------------------------------------------------------------------------------------------

        var pControllers    = { controller1 : {}

//          ----------------------------------------------------------------------------------

          , createOne       :  function createOne( req, res ) { trace( ` ${ req.body[ aColToSearch ] }` )                // .(10315.12.1 Beg RAM Added)

       if (!req.body[ aColToSearch ]) {                                                                     //  Validate request
                               res.status(400).send( { message: "Search column, ${aColToSearch}, can not be empty!" } );
            return
            }
      const pData             =                                                                            //  Create one
             {  Code          :  req.body.Code             
             ,  Name          :  req.body.Name           
             ,  Continent     :  req.body.Continent      
             ,  Region        :  req.body.Region         
             ,  SurfaceArea   :  req.body.SurfaceArea    
             ,  IndepYear     :  req.body.IndepYear      
             ,  Population    :  req.body.Population     
             ,  LifeExpectancy:  req.body.LifeExpectancy 
             ,  GNP           :  req.body.GNP            
             ,  GNPOld        :  req.body.GNPOld         
             ,  LocalName     :  req.body.LocalName      
             ,  GovernmentForm:  req.body.GovernmentForm 
             ,  HeadOfState   :  req.body.HeadOfState    
             ,  Capital       :  req.body.Capital        
             ,  Code2         :  req.body.Code2          
                };

            pModel.create( pData )
                  .then(   pData => {
                                    res.send( pBody ); } )
                  .catch(   pErr => {
                            var  pMsg = { message: ` ** Error occurred while creating a record for table ${aModel}.`, error: fmtObj(pErr).replace( /[\n]/g, '\n  ---' ) }
                                 console.log( fmtObj( pMsg ) ); res.status( 500 ).send( pMsg );             // .(10418.06.8 RAM I didn't get the message)
                                 } );
             } // eof createOne
//          ------------------------------------------------------------------
        } // eoo pControllers
//      --------------------------------------------------------------------------------------------------

          module.exports    =
             {  TableName   :   aTable
             ,  ModelName   :   aModel
             ,  Routes      :   pRoutes
             ,  Controllers :   pControllers
             ,  Options     :   pConfig                                                                     // .(10301.03.3)
                }

                trace(  "\nmodule.exports" )

// --------------------------------------------------------------------------------------------------------

          nDoTests          =   1

      if (doTest( 1, __filename )) {   // Format and possible redefine Controllers and Routes in pTableRoutes

     var  { getControllers }    =  require( `${FORMRs_4}/controller.fns.njs`  ).fns 
     var  { getAppRoutes   }    =  require( `${FORMRs_4}/route.fns.njs`       ).fns 

            pTableRoutes        =  getControllers( module.exports, 'showem' )
            pRoutes             =  getAppRoutes( pTableRoutes, aTable )                                       // .(10326.01.5 RAM Was setTableRoutes with 'Showem' )
                                   shoRoutes( pRoutes )
            }
//    ---   ------------------------------------------------------------------
