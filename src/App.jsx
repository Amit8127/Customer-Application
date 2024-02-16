import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignupForm from "./components/SignupForm";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import CustomerForm from "./components/CustomerForm";


function App() {
  return (
    <>
      <ToastContainer />
      <div className="container">
        <Routes>
          <Route path="/" element={<SignupForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<PrivateRoute />}>
            <Route path="home" element={<Home />} />
            <Route path="customerForm" element={<CustomerForm />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
