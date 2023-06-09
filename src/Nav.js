import React from "react";

export default function Nav() {
  let status;
  let dash;
  const logged = localStorage.getItem("token");
  if (logged) {
    status = "Logout";
    dash = "dashboard";
  } else {
    status = "Signup";
    dash = "login";
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        MeG
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link" href="/">
            Home <span className="sr-only"></span>
          </a>
          <a className="nav-item nav-link" href={"/" + dash}>
            {dash}
          </a>
          <a className="nav-item nav-link" href={"/" + status}>
            {status}
          </a>
          <a className="nav-item nav-link" href="/gps">
            GPS
          </a>
        </div>
      </div>
    </nav>
  );
}
