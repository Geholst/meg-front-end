import React, { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
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
        body: JSON.stringify({
          firstName: formData.firstname,
          lastName: formData.lastname,
          email: formData.email,
          password: formData.password,
          number: formData.number,
          allergies: formData.allergies,
          preferredHospital: formData.preferredHospital,
        }),
      });
      if (results.status === 200) {
        results = await results.json();
        localStorage.setItem("token", results.jwtToken);
      } else {
        alert("Signup Failed");
      }
      console.log(results);
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

    // Basic Validation using a combination of regex and string methods
    if (formData.firstname.trim() === "") {
      newErrors.firstname = "First name is required.";
      isValid = false;
    }

    if (formData.lastname.trim() === "") {
      newErrors.lastname = "Last name is required.";
      isValid = false;
    }

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

    if (formData.preferredHospital.trim() === "") {
      newErrors.preferredHospital = "Preferred hospital is required.";
      isValid = false;
    }

    // a react hook that will update the state of the component if there are any errors
    setErrors(newErrors);
    return isValid;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </label>
        {errors.firstname && <div className="error">{errors.firstname}</div>}
      </div>
      <div>
        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </label>
        {errors.lastname && <div className="error">{errors.lastname}</div>}
      </div>
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
      <div>
        <label>
          Phone Number:
          <input
            type="tel"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
          />
        </label>
        {errors.number && <div className="error">{errors.number}</div>}
      </div>
      <div>
        <label>
          Allergies:
          <textarea
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Preferred Hospital:
          <input
            type="text"
            name="preferredHospital"
            value={formData.preferredHospital}
            onChange={handleChange}
            required
          />
        </label>
        {errors.preferredHospital && (
          <div className="error">{errors.preferredHospital}</div>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
