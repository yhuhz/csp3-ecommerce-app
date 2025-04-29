import React, { useState, useEffect } from "react";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
  });

  console.log(formData.firstName);
  console.log(formData.lastName);
  console.log(formData.mobileNo);

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:4000/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          mobileNo: formData.mobileNo,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Profile updated successfully!");
      } else {
        setMessage(data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Update error:", error);
      setMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Update Profile</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="form-group mb-3">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="mobileNo">Mobile Number</label>
          <input
            type="tel"
            className="form-control"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
