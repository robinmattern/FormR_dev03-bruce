
var pFS = require( 'fs' )

    aDir = ''
    aDir = '.'
    aDir = 'dashboard'
//  aDir = 'fashion'
//  aDir = 'e-shop'

    aDir = process.argv[2] || aDir

var pPackage = JSON.parse( pFS.readFileSync( `${aDir}/package.json` ) )


var pDependencies     =  pPackage[ 'dependencies'     ]
var pDependencies_dev =  pPackage[ 'dev-dependencies' ]

//  console.log( pPackage )
var mDependencies     =  getModules( pDependencies )

    shoModules2( aDir, mDependencies )

function shoModules1( aDir, mDependencies) {
         console.log( `\n${aDir}\n--------------------------------------------------"` )
         console.log( `  "dependencies": {` )
         console.log( mDependencies.join ( '\n' ) )
         console.log( `     }` )
         }

function shoModules2( aDir, mDependencies) {
         mDependencies.map( pModule => {
     var aStr = String( pModule ).replace( /[":^,]/g , " " )
         console.log( aDir, aStr ) } )
         }

    pPackage.dependancies = pDependencies

//  console.log( JSON.stringify( pPackage ) )
//  console.log( inspect( pPackage ) )


function getModules( pDependancies ) {
  return Object.keys( pDependancies ).map( aKey => { return `    "${ take( 30, `${aKey}"` ) } : "${ pDependancies[ aKey ] }" ,` } )
         }
function take(n,a) { return (a + '                                      ').substr( 0, n ) }
function inspect( pObj ) { return require( 'util' ).inspect( pObj, { depth: 99 } ) }

