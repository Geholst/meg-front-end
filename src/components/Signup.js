import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function Login() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    number: "",
    allergies: "",
    preferredHospital: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      console.log(formData);
      let results = await fetch("https://meg-backend.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (results.ok) {
        results = await results.json();
        localStorage.setItem("userId", results.New_User.userId);
        localStorage.setItem("token", results.New_User.jwtToken);
        localStorage.setItem("email", results.New_User.email);
        window.location.href = "/dashboard";
      } else {
        alert("Signup Failed");
      }
      console.log(results.New_User);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Simple Validation
    ["firstName", "lastName", "preferredHospital"].forEach((name) => {
      if (formData[name].trim() === "") {
        newErrors[name] = `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } is required.`;
        isValid = false;
      }
    });

    if (!formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      newErrors.email = "Invalid email address.";
      isValid = false;
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password should be at least 8 characters.";
      isValid = false;
    }

    if (!formData.number.match(/^\d+$/)) {
      newErrors.number = "Phone number should contain only digits.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control
                type="tel"
                name="number"
                value={formData.number}
                onChange={handleChange}
                isInvalid={!!errors.number}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.number}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Allergies:</Form.Label>
              <Form.Control
                as="textarea"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Preferred Hospital:</Form.Label>
              <Form.Control
                type="text"
                name="preferredHospital"
                value={formData.preferredHospital}
                onChange={handleChange}
                isInvalid={!!errors.preferredHospital}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.preferredHospital}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
