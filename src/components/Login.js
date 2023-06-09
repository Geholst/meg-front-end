import React, { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      // console.log(formData);
      let results = await fetch("https://meg-backend.herokuapp.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (results.status === 200) {
        results = await results.json();
        localStorage.setItem("token", results.jwtToken);
        localStorage.setItem("email", results.email);
        // Successful login, handle the response data
        console.log(results);
        window.location.href = "/dashboard";
      } else {
        // Login failed, display an error message
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        alert("Login Failed");
      }
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

    if (!formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      newErrors.email = "Invalid email address.";
      isValid = false;
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
