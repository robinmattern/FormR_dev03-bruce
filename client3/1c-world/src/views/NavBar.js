   import   React       from "react";
   import { Link }      from "react-router-dom";
// import   AuthService from "./FRAUTH/AuthService.js";        //#.(10420.04.1 RAM Move into FRAUTH folder).(10906.03.5)
   import   AuthService from "./rauth/AuthService.js";         // .(10906.03.5 RAM Was: ../services/AuthService.js)

function NavBar() {
  var isViewer = false;
  var isAdmin  = false;
  var isEditor = false;
  var isPublic = true;
  
  var pUser = AuthService.getCurrentUser();

  if (pUser) {
    isViewer = pUser.role.match(/Viewer/i) != null;
    isEditor = pUser.role.match(/Editor/i) != null;
    isAdmin  = pUser.role.match(/Admin/i) != null;
  } else {
    isPublic = true;
  }

  // -------------------------------------------------------------

  function MenuItem(props) {
    var aLink = (props.link ? props.link : props.name).toLowerCase()         // .(10417.02.1 RAM Add Link property) 
    return (
      <li className="nav-item">
        <Link to={"/" + aLink} className="nav-link">                        {/* .(10417.02.2 RAM Was props.name.toLowerCase()) */} 
          <i> {props.name} </i>
        </Link>{" "}                                                        {/* .(10417.03.1 RAM Add a space between menu items */}
      </li>
    );
  }

  //        -------------------------------------------
  var mnuItemsLogo = "";
  var mnuItemsLeft = "";
  var mnuItemsRight = "";
  var mnuItemsUserAvatar = "";

  // Logo is the same for all roles
  mnuItemsLogo = (
    <a href="/home" className="navbar-brand">
      <img
        src="/favicon-32x32.png"
        alt="FormR"
        className="brand-image img-circle elevation-3"
        style={{ opacity: 0.8 }}
      />
      <span style={{ marginLeft: "5px" }}>FormR</span>
    </a>
  );

  if (isPublic) {
    mnuItemsLeft = (
      <ul className="navbar-nav">
        <MenuItem name="Home" />
        <MenuItem name="Public" /> 
      </ul>
    );

    mnuItemsRight = (
      <ul className="navbar-nav ml-auto">
        <MenuItem name="Login" />
      </ul>
    );
  }

  if (isAdmin) {
    mnuItemsLeft = (
      <ul className="navbar-nav">
        <MenuItem name="Home" />
        <MenuItem name="Profile"/>  
        <MenuItem name="Admin" link="admin"/>            {/* .(10417.02.3) */}  
{/*     <MenuItem name="World" />                     */}{/* .(10915.03.1 RAM No World in app4c) */}  
      </ul>
    );

    mnuItemsRight = (
      <ul className="navbar-nav ml-auto">
        <MenuItem name="Logout" />
      </ul>
    );

    mnuItemsUserAvatar = (
      <li className="nav-item">
        <a href="/changeprofile" className="navbar-brand">
          <i className="fas fa-user-circle"></i>
        </a>
      </li>
    );
  }


  if (isViewer) {
    mnuItemsLeft = (
      <ul className="navbar-nav">
        <MenuItem name="Home" />
        <MenuItem name="Viewer" link="profile"/>                        {/* .(10417.02.4) */}   
        <MenuItem name="World" /> 
      </ul>
    );

    mnuItemsRight = (
      <ul className="navbar-nav ml-auto">
        <MenuItem name="Logout" />
      </ul>
    );

    mnuItemsUserAvatar = (
      <li className="nav-item">
        <a href="/changeprofile" className="navbar-brand">
          <i className="fas fa-user-circle"></i>
        </a>
      </li>
    );
  }

  if (isEditor) {
    mnuItemsLeft = (
      <ul className="navbar-nav">
        <MenuItem name="Home" />
        <MenuItem name="Editor" link="profile"/>                        {/* .(10417.02.5) */}   
        <MenuItem name="World" />
      </ul>
    );

    mnuItemsRight = (
      <ul className="navbar-nav ml-auto">
        <MenuItem name="Logout" />
      </ul>
    );

    mnuItemsUserAvatar = (
      <li className="nav-item">
        <a href="/changeprofile" className="navbar-brand">
          <i className="fas fa-user-circle"></i>
        </a>
      </li>
    );
  }
  // -------------------------------------------------------------

  return (
    <nav className="navbar navbar-expand navbar-dark">
      {mnuItemsLogo}
      {mnuItemsLeft}
      {mnuItemsRight}
      {mnuItemsUserAvatar}
    </nav>
  );

  // -------------------------------------------------------------
}

export default NavBar;
