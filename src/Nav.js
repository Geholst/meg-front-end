import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export default function Navigation() {
  const logged = localStorage.getItem("token");
  const status = logged ? "Logout" : "Signup";
  const dash = logged ? "dashboard" : "login";

  return (
    <Navbar className="p-2" bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">MeG</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNavAltMarkup" />
      <Navbar.Collapse id="navbarNavAltMarkup">
        <Nav className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href={"/" + dash}>{dash}</Nav.Link>
          <Nav.Link href={"/" + status}>{status}</Nav.Link>
          {logged && <Nav.Link href="/gps">Location</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
