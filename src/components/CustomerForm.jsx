import React, { useState } from "react";
import { createACustomer } from "../services/adminService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CustomerForm = () => {
  const navigate = useNavigate();
  const style = { maxWidth: "70%" };
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    street: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Basic validation, you can add more complex validation as needed
    Object.entries(formData).forEach(([key, value]) => {
      if (value.trim() === "") {
        newErrors[key] = "This field is required";
        isValid = false;
      } else if (formData.phone.length < 10) {
        newErrors["phone"] = "Phone number length must be 10 characters";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      // Handle form submission logic here
      const responce = await createACustomer(formData);
      if (responce.id) {
        toast.success("Customer Created Successfully");
        // If successful, navigate to another page
        navigate("/admin/home");
        setLoading(false);
        // Reset the form after submission
        setFormData({
          first_name: "",
          last_name: "",
          street: "",
          address: "",
          city: "",
          state: "",
          email: "",
          phone: "",
        });
      } else {
        toast.error(responce);
        setLoading(false);
      }
    } else {
      setLoading(false);
      console.log("Form has errors. Please correct them.");
    }
  };

  return (
    <>
      <h2 className="text-center mt-4 mb-5">Customer Details</h2>
      <div
        className="d-flex justify-content-center w-75"
        style={{ marginInline: "auto" }}
      >
        <form
          className="row g-3 p-4 border rounded shadow"
          onSubmit={handleSubmit}
        >
          <div className="col-md-6" style={{ marginInline: "auto" }}>
            <label htmlFor="first_name" className="form-label">
              First Name:
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.first_name ? "is-invalid" : ""
              }`}
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
            {errors.first_name && (
              <div className="invalid-feedback">{errors.first_name}</div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="last_name" className="form-label">
              Last Name:
            </label>
            <input
              type="text"
              className={`form-control ${errors.last_name ? "is-invalid" : ""}`}
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
            {errors.last_name && (
              <div className="invalid-feedback">{errors.last_name}</div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="street" className="form-label">
              Street:
            </label>
            <input
              type="text"
              className={`form-control ${errors.street ? "is-invalid" : ""}`}
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
            />
            {errors.street && (
              <div className="invalid-feedback">{errors.street}</div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="address" className="form-label">
              Address:
            </label>
            <input
              type="text"
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && (
              <div className="invalid-feedback">{errors.address}</div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="city" className="form-label">
              City:
            </label>
            <input
              type="text"
              className={`form-control ${errors.city ? "is-invalid" : ""}`}
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && (
              <div className="invalid-feedback">{errors.city}</div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="state" className="form-label">
              State:
            </label>
            <input
              type="text"
              className={`form-control ${errors.state ? "is-invalid" : ""}`}
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
            {errors.state && (
              <div className="invalid-feedback">{errors.state}</div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="phone" className="form-label">
              Phone:
            </label>
            <input
              type="number"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </div>

          <div style={{ textAlign: "right" }} className="col-12 mt-3">
            <button disabled={loading} type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CustomerForm;
