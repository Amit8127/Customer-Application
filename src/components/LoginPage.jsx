import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/adminService";
import { doLogedIn } from "../auth/auth";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const validateForm = () => {
      const newErrors = {};
      let isValid = true;

      // Validate email
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
        isValid = false;
      }

      // Validate password
      if (!formData.password.trim()) {
        newErrors.password = "Password is required";
        isValid = false;
      }

      setErrors(newErrors);
      setIsFormValid(isValid);
    };

    validateForm();
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    
    e.preventDefault();

    // Check if form is valid before attempting login
    if (isFormValid) {
      setLoading(true);
      // Perform login logic (e.g., API request)
      const responce = await login(formData);
      if (responce.username) {
        // Storing the username and token in the local storage
        doLogedIn(responce);
        toast.success("Admin LoggedIn Successfully");
        // If successful, navigate to another page
        navigate("/admin/home");
        setLoading(false);
      } else {
        toast.error(responce);
        setLoading(false);
      }
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="row justify-content-start">
      <h2 className="text-center">LogIn Page</h2>
      <form className="card mt-3 shadow-lg" onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="text-danger">{errors.email}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <p className="text-danger">{errors.password}</p>}
        </div>
        <button disabled={loading} type="submit" className="btn btn-primary">
          Login
        </button>

        <p style={{ textAlign: "center", marginTop: "25px" }}>
          Don't have an Account? Click here to{" "}
          <span
            style={{
              color: "#316cf4",
              fontWeight: "500",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            SingUp.
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
