import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUp } from "../services/adminService";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    // Validation
    let newErrors = {};
    if (!formData.email) {
      setLoading(false);
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setLoading(false);
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      setLoading(false);
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      setLoading(false);
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      setLoading(false);
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.confirmPassword !== formData.password) {
      setLoading(false);
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      setErrors(newErrors);
    } else {
      // Form is valid, you can proceed with submission or API call
      let data = { email: formData.email, password: formData.password };
      const responce = await signUp(data);
      if (responce.email) {
        setLoading(false);
        toast.success("Admin Created Successfully");
        navigate("/login");
      } else {
        setLoading(false);
        toast.error(responce);
      }
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="row justify-content-start">
      <h2 className="text-center">SignUp Page</h2>
      <form className="card mt-3 shadow-lg" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-control ${
              errors.email ? "is-invalid" : ""
            } form-control`}
          />
          <div className="invalid-feedback">{errors.email}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.password}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password:
          </label>
          <input
            type="text"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`form-control ${
              errors.confirmPassword ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback">{errors.confirmPassword}</div>
        </div>

        <button disabled={loading} type="submit" className="btn btn-primary">
          Sign Up
        </button>

        <p style={{ textAlign: "center", marginTop: "25px" }}>
          Already have an Account? Click here to{" "}
          <span
            style={{ color: "#316cf4", fontWeight: "500", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            LogIn.
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
