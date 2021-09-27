   import * as React            from 'react';
   import { Admin, Resource }   from 'react-admin';
   import { fetchUtils }        from 'react-admin';                                     // .(10420.03.1 RAM)
// import { ListGuesser }       from 'react-admin';

   import   restServerProvider  from 'ra-data-simple-rest';
// import   jsonServerProvider  from 'ra-data-json-server';
                                                                                        // .(10326.03.11 Add City Tables) 
   import { CityView   }        from "./CityTable.js";                                  // .(10417.03.4 RAM Use a Read-Only Component) 
   import { CityList   }        from "./CityTable.js";                                  // .(10322.02.4 Beg RAM Change files names).(10322.03.1 Beg RAM Get rid of extra dots.  Why?)
   import { CityEdit   }        from "./CityTable.js";                       
   import { CityCreate }        from "./CityTable.js";                                  // .(10322.02.4 End)
   import   CityIcon            from  '@material-ui/icons/Group'; 
                                                                                        // .(10326.03.12 Add City Tables) 
   import { CountryView   }    from "./CountryTable.js";                                // .(10417.03.5) 
   import { CountryList   }    from "./CountryTable.js";                                // .(10322.02.1 RAM Add Other UserTables)
   import { CountryEdit   }    from "./CountryTable.js";
   import { CountryCreate }    from "./CountryTable.js";                                // .(10321.04.5).(10322.03.1 End) 
   import   CountryIcon        from  '@material-ui/icons/Book';

   import { useHistory }        from "react-router-dom";                                // .(10417.03.6) 
// import   AuthService         from "../rauth/AuthService.js";                         // .(10417.03.2).(10420.04.12 RAM Was: ../services).(10915.05.2 RAM Was: FRAUTH) 

// import   Dashboard           from "./Tables1Home.js";                                //#.(10322.04.1  RAM Add Welcome Page)
// import { Tables1Home as Dashboard } from "./WorldHome.js";                           //#.(10326.03.13 RAM Was Tables1Admin)

// const    API_URL        =  process.env.REACT_APP_API_URL + "/api";                   //#.(103xx.03.15 RAM get from .ENV file. Using REACT_APP special prefix).(10403.03.1)
// const    API_URL        =  process.env.REACT_APP_API_URL + "/api/world";             //#.(10326.03.15 RAM Add DBSN to path)
// const    API_URL        =  process.env.REACT_APP_API_URL + "/api/world";             //#.(10403.03.1  RAM For real)
// const    WORLD_API_URL  =  process.env.WORLD_API_URL;                                // .(10915.06.6  RAM Put it all into .env)
   const    WORLD_API_URL  =  process.env.REACT_APP_WORLD_API_URL;                      // .(10915.06.6  RAM Put it all into .env).(10915.08.2 RAM "REACT_APP_" prefix is required)

// --------------------------------------------------------------------------------

// const    App             = ( ) =>          ( ... )  
// const    App             = ( ) => { return ( ... ) } 
     var    App = function App( )    { 

//         ------------------------------------------------------------------

       var  currentUser      =                                                          //#.(10906.01.4 Beg RAM Short circuit login here rather than in AuthService.js)
             { username      : 'admin'                             
             , id           :  1
             , email        : 'robin.mattern@gmail.com'
             , active       : 'yes'
             , role         : 'admin'
             , passworddate : '2021-12-01'
             , accessToken  : '123456789 123456789'
               }                                                                        //#.(10906.01.4 End)

      let  history          =  useHistory();                                            // .(10417.03.8 Beg RAM Check User Creds)//#.(10906.01.4) 
//    var  currentUser      =  AuthService.getCurrentUser();                          
      if (!currentUser) {      return goHome( "You are not logged in" ) }           

//         ------------------------------------------------------------------

      var  httpClient       =  ( url, options = {} ) => {                               // .(10420.03.3 Beg RAM Added)
      if (!options.headers) {
           options.headers  =    new Headers( { Accept: 'application/json' } );
           }
//  const  token            =    localStorage.getItem('token');
//         options.headers.set( 'Authorization', `Bearer ${token}` );
      var  token            =    currentUser.accessToken
           options.headers.set( 'x-access-token', token );    
//         options.headers.append( 'x-access-token', token );    
//         options.headers.get( 'x-access-token')

   return  fetchUtils.fetchJson( url, options );

           } // eof httpClient                                                          // .(10420.03.3 Beg RAM Added)
//         ------------------------------------------------------------------

// const    DataService    =  restServerProvider(  API_URL );                           //#.(10314.06.1 RAM Use REACT_APP_API_URL setin .env file).(10420.03.2)
// const    DataProvider   =  simpleRestProvider( 'http://localhost:3000', httpClient); //#.(10420.03.4 RAM From example in docs)             
   const    DataProvider   =  restServerProvider(  WORLD_API_URL,          httpClient); // .(10420.03.4 RAM Add httpClient).(10915.06.7)            

//         ------------------------------------------------------------------

      var  aRole           =  currentUser.role    
       if (aRole.match( /editor|admin/i ) == null) { 

        return ( 

          <Admin
            dataProvider    = { DataProvider }
              >
            <Resource 
              name          =  "Cities"                   // .(10326.03.9 RAM Add World Table)
              icon          = { CityIcon     } 
              list          = { CityView     } 
              />
           <Resource 
              name          =  "Countries"                // .(10326.03.9 RAM Add World Table)    
              icon          = { CountryIcon  }   
              list          = { CountryView  } 
              /> 
          </Admin>
          );

       } else {
                                                                                         // .(10417.03.8 End)
        return ( 

          <Admin
//          dashboard       = { Dashboard     }
            dataProvider    = { DataProvider  }
            >
            
            <Resource 
              name          =  "Cities"                   // .(10326.03.9 RAM Add World Table)
              icon          = { CityIcon      } 
              list          = { CityList      } 
              edit          = { CityEdit      } 
              create        = { CityCreate    } 
              />
           <Resource 
              name          =  "Countries"                // .(10326.03.9 RAM Add World Table)    
              icon          = { CountryIcon   }   
              list          = { CountryList   } 
              edit          = { CountryEdit   } 
              create        = { CountryCreate } 
              /> 
          </Admin>
          );
       }

function  goHome( aMsg ) { 
          localStorage.message = aMsg;
          history.push("/home");   // Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
//        window.location.reload();
  return  false      
          }

        }

export default App;


