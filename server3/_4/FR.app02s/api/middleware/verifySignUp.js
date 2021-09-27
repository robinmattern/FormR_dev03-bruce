      const db      =  require("../models/index.js");
      const ROLES   =  db.ROLES;
      const User    =  db.fruser;                                               // .(10331.011.2)

checkDuplicateUsernameOrEmail = ( req, res, next ) => { trace()
 
  User.findOne( {   // Username
    where: {
      username: req.body.username
    }
  }).then( function onCheckUsernameInUse( user ) {              // .(10228.03.x) 
      if (user) {              trace(  `    Failure: Username, '${ req.body.username }', is already in use!` )
          res.status(400).send( { message: `Failure: Username, '${ req.body.username }', is already in use!` } );
          return;
          }
    User.findOne( {  // Email
      where: {
        email: req.body.email
      }
    }).then( function onCheckEmailInUse( user ) {              // .(10228.03.x) 
      if (user) {              trace(  `    Failure: Email, '${ req.body.email }', is already in use!` )
          res.status(400).send( { message: `Failure: Email, '${ req.body.email }', is already in use!` } );
          return;
          }
                               trace(  "    Success: Username and Email are not already in use!" )
      next();
    });
  });
};

checkRolesExisted = ( req, res, next ) => { trace( )

  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes( req.body.roles[i] )) {
                               trace(  `    Failure: Role, '${ req.body.roles[i] }', does not exist!` )
          res.status(400).send( { message: `Failure: Role, '${ req.body.roles[i] }', does not exist!` } );
          return;
          }
                               trace(  `    Success: Role(s), '${ req.body.roles.join() }', exist.` )
      }   }
  if (req.body.role) {                                          // .(10415.05.7)
      if (!ROLES.includes(req.body.role)) {
                               trace(  `    Failure: Role, '${ req.body.role }', does not exist!` )
          res.status(400).send( { message: `Failure: Role, '${ req.body.role }', does not exist!` } );
          return;
          }   
                               trace(  `    Success: Role, '${ req.body.role }', exists.` )
      }     
      next();
    };

const verifySignUp = {
      checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
      checkRolesExisted:             checkRolesExisted
      };

module.exports = verifySignUp;

// -------------------------------------------------------------------------------------------------
