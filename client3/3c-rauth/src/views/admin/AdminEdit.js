   import * as React            from 'react';
   import { Admin, Resource }   from 'react-admin';
// import { ListGuesser }       from 'react-admin';

   import   restServerProvider  from 'ra-data-simple-rest';
// import   jsonServerProvider  from 'ra-data-json-server';

// import { UserList   }        from "../components/User.components.js";                // .(10321.04.5 Beg RAM Add extra dot.  Why?)
   import { UserList   }        from "./AdminUserTable.js";                             // .(10322.02.8 Beg RAM Change files names).(10322.03.1 Beg RAM Get rid of extra dots.  Why?)
   import { UserEdit   }        from "./AdminUserTable.js";
   import { UserCreate }        from "./AdminUserTable.js";
   import   UserIcon            from '@material-ui/icons/Group';                        // .(10404.03.4 RAM Not available in Client2).(10404.03.6 RAM Works now)

   import { RoleList   }        from "./AdminRoleTable.js";
   import { RoleEdit   }        from "./AdminRoleTable.js";
   import { RoleCreate }        from "./AdminRoleTable.js";                             // .(10322.02.8 End) 
   import   RoleIcon            from '@material-ui/icons/Book';                         // .(10404.03.5 RAM Not available in Client2).(10404.03.7)

   import { useHistory }        from "react-router-dom";                                // .(10417.03.1) 
   import   AuthService         from "../rauth/AuthService.js";                         // .(10417.03.2).(10420.04.11 RAM Was: ../services).(10915.05.1 RAM Was: FRAUTH) 

// import { Admin_Dashboard as Dashboard } from "./AdminHome.js";                       // .(10322.04.2 RAM Add Welcome Page)

// const    API_URL         =  process.env.REACT_APP_API_URL + "/api/formr";            //#.(10322.01.6 RAM Was "/api").(10908.01.3)
// const    API_URL         =  process.env.ADMIN_APP_API_URL + "/api/formr";            // .(10908.01.3 RAM Use a different URL for Admin)
   const    ADMIN_API_URL   =  process.env.REACT_APP_ADMIN_API_URL;                     // .(10915.06.1 RAM Put entire path into .env).(10915.08.3 RAM "REACT_APP_" prefix is required)
   const    DataService     =  restServerProvider(   ADMIN_API_URL );                   // .(10314.06.1 RAM Use REACT_APP_API_URL set in .env file).(10915.06.2) 

// const    App             = ( ) =>          ( ... )  
// const    App             = ( ) => { return ( ... ) } 
      var   App = function App( )    { 

      let  history      =  useHistory();                                                // .(10417.03.3 Beg RAM Check User Creds)
      var  currentUser  =  AuthService.getCurrentUser();                          
      if (!currentUser) {        return goHome( "You are not logged in" ) }           

      var  aRole  =  currentUser.role.toLowerCase()                                     // .(10915.02.1 RAM Admin/Users saves capitalized role)  
       if (aRole !== 'admin' ) { return goHome( `You're not authorized to edit FormR User Auth data!` ) }  
                                                                                        // .(10417.03.3 End)
        return ( 

          <Admin

//          dashboard       = { Dashboard    }    
            dataProvider    = { DataService  }
            >
            <Resource 
              name          =  "users"    
              icon          = { UserIcon   } 
              list          = { UserList   } 
              edit          = { UserEdit   } 
              create        = { UserCreate } 
              />
           <Resource 
              name          =  "roles"    
              icon          = { RoleIcon   }   
              list          = { RoleList   } 
              edit          = { RoleEdit   } 
              create        = { RoleCreate } 
              /> 
          </Admin>
          );

function  goHome( aMsg ) { 
          localStorage.message = aMsg;
          history.push("/home");   // Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
//        window.location.reload();
  return  false      
          }
      }

export default App;


