
                               process.env.FORMR_HOME = __dirname.replace( /[\\\/](_3|serv|clie).+/, '')   // .(10829.01.1 RAM)

	FormR       =  require( `${process.env.FORMR_HOME}/_3/FR.FNSs/FormR.fns_u2.5.njs` )                    // .(10829.01.2)
//  FormR.init(  __dirname,  __filename );      // FORMR.help()                                            // .(10829.01.3)

//  FormR       =  require( __dirname.replace( /[\\\/](serv|clie).+/, '') + '/_3/FR.FNSs/FormR.init.js' )  // .(10829.01.4) 

    module.exports = FormR 