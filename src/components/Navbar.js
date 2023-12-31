import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Navbar = (props) => {
  let location = useLocation();
  let navigate=useNavigate();
  const handleLogout=()=>{
      localStorage.removeItem('token');
      navigate('/login');
     props.showAlert("Logged out successfully","success");
  }
  return (
    <div>
      <nav id="navbar" className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
        <img src="favicon.png" style={{height:"38px"}} alt=""/>
          <Link className="navbar-brand" to="/" style={{fontFamily: "cursive,Pacifico"}}>
            MyWrites
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?
            <form className="d-flex" role="search">
              <Link className="btn btn-info mx-1" to="/login" role="button">Login</Link>
              <Link className="btn btn-info mx-1"  to="/signup" role="button">Signup</Link>
            </form>:<button className="btn btn-info mx-1" onClick={handleLogout}>Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
