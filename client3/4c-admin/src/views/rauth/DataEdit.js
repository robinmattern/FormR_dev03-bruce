  
   import { useHistory } from "react-router-dom";
   import   AuthService  from "./AuthService";      // .(10420.04.3)

function DataEdit( aDB ) {  
  
  let  history     =   useHistory();
  var  currentUser =   AuthService.getCurrentUser();
  if (!currentUser) {       return goHome( "You are not logged in" ) }

      aDB    =  aDB.toUpperCase() 
 var  aRole  =  currentUser.role    

  if (aDB   === 'FORMR') {
  if (aRole === 'admin' ) { return goHome( "You can edit the User Authentication database." ) }
                            return goHome( `You're not authorized to edit ${aDB} data!` )
      }

  if (aDB   === 'WORLD') {
  if (aRole === 'admin' ) { return goHome( "You can edit the demo World database." ) }
  if (aRole === 'editor') { return goHome( "You can edit the demo World database." ) }
  if (aRole === 'viewer') { return goHome( "You can view the demo World database." ) }
                            return goHome( `You're not authorized to access the ${aDB} database!` )
      }

function goHome(aMsg) { 
         localStorage.message = aMsg;
         history.push("/home");   // Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
//       window.location.reload();
  return false      
         }
      }

  export default DataEdit 

