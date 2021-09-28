  import axios from "axios";
  import bcrypt from "bcryptjs"

// const API_URL       =  process.env.REACT_APP_API_URL + "/api/auth/"; //#.(01108.02.1 RAM get from .ENV file. Using REACT_APP special prefix).(10914.01.1)
// const API_URL       =  process.env.REACT_APP_API_URL + "/api ";      //#.(01108.02.1 RAM get from .ENV file. Using REACT_APP special prefix).(10914.01.1).(10915.06.2)
// const RAUTH_URL     = `${API_URL}/rauth`                             //#.(10914.01.2 RAM Make paths variable).(10915.06.2)
// const ADMIN_URL     = `${API_URL}/formr`                             //#.(10914.01.3).(10915.06.2)

   const ADMIN_API_URL =  process.env.REACT_APP_ADMIN_API_URL;          // .(10915.06.2 RAM Put entire path into .env).(10915.08.1 RAM "REACT_APP_" prefix is required)
   const RAUTH_API_URL =  process.env.REACT_APP_RAUTH_API_URL;          // .(10915.06.3)

   const aSalt         = '$2a$04$qy3HhHlVJT/wUB364EVjmu'                // .(10416.04.1 RAM Need this for bcrypt.hash to match)
                
   class AuthService {

//  ----------------------------------------------------------

  login(username, password) {

    password =  bcrypt.hashSync( password, aSalt )              // .(10416.04.4 RAM Was , 8) 

    return axios                                                // .(10914.02.1 RAM with . methods)
//    .post( API_URL +    "auth/login", { username, password }) // .(10228.12.7 RAM Changed signin to login).(10914.01.4)
      .post(  `${RAUTH_API_URL}/login`, { username, password }) // .(10228.12.7 RAM Changed signin to login).(10914.01.4 RAM changed API_URL + "auth" to "${RAUTH_URL}").(10915.06.4)

      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
//  ----------------------------------------------------------

  logout() {
  	
    localStorage.removeItem("user");
  }
//  ----------------------------------------------------------

  register(username, email, password) {
  	
    password =  bcrypt.hashSync( password, aSalt )              // .(10416.04.5 RAM Was , 8) 

//  return axios.post(  API_URL + "auth/register", { username, email, password });  //#.(10228.12.7 RAM Changed signup to register).(10914.01.5)
    return axios.post(`${RAUTH_API_URL}/register`, { username, email, password });  // .(10228.12.7 RAM Changed signup to register).(10914.01.5).(10915.06.4)
  }
//  ----------------------------------------------------------

  // bt note - if no password change should we have updateCurrentUserNoPassword() ???
  
  updateCurrentUser(id, username, email, password) {
  	
    password =  bcrypt.hashSync( password, aSalt )              // .(10416.04.6 RAM Was , 8) 

    var data = {};

    if (username) { data.username = username }
    if (email) { data.email = email }
    if (password) { data.password = password }

//  return axios.put( API_URL + `formr/users/${id}` , data );   //#.(10914.01.6)
    return axios.put(`${ADMIN_API_URL}/users/${id}` , data );   // .(10914.01.6).(10915.06.6)
    }
//  ----------------------------------------------------------

  getCurrentUser() {

    return JSON.parse( localStorage.getItem("user") );          // .(10906.01.1)

/*  return { username     : 'admin'                             //#.(10906.01.1 Beg RAM Short circuit login)
           , id           :  1
           , email        : 'robin.mattern@gmail.com'
           , active       : 'yes'
           , role         : 'admin'
           , passworddate : '2021-12-01'
           , accessToken  : '123456789 123456789'
             }                                                  // .(10906.01.1 End)
 */    
    }
//  ----------------------------------------------------------

  } // eoc AuthService
// ---------------------------------------------------------------------------

export default new AuthService();
