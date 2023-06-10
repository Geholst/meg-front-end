import React from "react";
import "bootstrap";

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
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-item nav-link" href="/">
            Home
          </a>
          <a className="nav-item nav-link" href={"/" + dash}>
            {dash}
          </a>
          <a className="nav-item nav-link" href={"/" + status}>
            {status}
          </a>
          {logged ? (
            <a className="nav-item nav-link" href="/gps">
              Location
            </a>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
