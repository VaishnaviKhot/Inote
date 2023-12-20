import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

const Navbar = () => {
  let history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/Login");
  };

  let location = useLocation();
  // useEffect(() => {
  //     console.log(location.pathName);
  //   }, [location]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarSupportedContent"
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
                    location.pathName === "/" ? "active" : ""
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
                    location.pathName === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/">
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      Another action
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      Something else here
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link disabled"
                  to="/"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Disabled
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?
            <form className="d-flex">
              <Link className="btn btn-primary mx-2" to="/Login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mx-2" to="/Signup" role="button">
                Signup
              </Link>
            </form>
            :
            <button className="btn btn-primary mx-2" onClick={handleLogout}>
              Logout
            </button>
            }
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;



// {/* <input
//                 className="form-control me-2"
//                 type="search"
//                 placeholder="Search"
//                 aria-label="Search"
//               />
//               <button className="btn btn-outline-success" type="submit">
//                 Search
//               </button> */}