import React from "react";

export default function Nav(){
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand">MeG</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-item nav-link" href="/">Home <span class="sr-only"></span></a>
            <a class="nav-item nav-link" href="/login">Login</a>
            <a class="nav-item nav-link" href="/signup">Signup</a>
          </div>
        </div>
      </nav>
    );
}