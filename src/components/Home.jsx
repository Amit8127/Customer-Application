// Import necessary React components and libraries
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import data from "../assets/data";
import { doLogOut } from "../auth/auth";
import {
  deleteACustomerById,
  getAllCustomers,
  getCustomerPages,
  updateACustomer,
} from "./../services/adminService";
import { toast } from "react-toastify";
import EditForm from "./EditForm";

const Home = () => {
  const navigate = useNavigate();
  // State variables to manage data
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const [searchColumn, setSearchColumn] = useState("first_name");
  const [direction, setDirection] = useState("ASC");
  const [loading, setLoading] = useState(false);

  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch the list of customers
  const fetchAllCustomers = async () => {
    try {
      const response = await getAllCustomers();
      // setCustomers(response);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // Fetch the list of customers in pages
  const fetchCustomerPages = async () => {
    try {
      const response = await getCustomerPages(
        pagination.page,
        pagination.pageSize,
        direction,
        searchColumn
      );
      setCustomers(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // Fetch a single customer based on ID
  const fetchCustomerById = async (customerId) => {
    try {
      const response = await axios.get(`/api/customers/${customerId}`);
      setSelectedCustomer(response.data);
    } catch (error) {
      console.error("Error fetching customer by ID:", error);
    }
  };

  // Update an existing customer
  const updateCustomer = async (editedData) => {
    try {
      // Assume newCustomer contains updated information
      // Reset form and refresh customer list
      const responce = await updateACustomer(editId, editedData);
      if (responce.id === editId) {
        toast.success("Customer Edited successfully");
        setEditId(null);
      } else {
        toast.error(responce);
      }
      fetchCustomerPages();
      // fetchCustomers();
    } catch (error) {
      toast.error(error.message);
      console.error("Error in fetching customer from sunbase:", error);
    }
  };

  const handleEdit = (customerId) => {
    // Find the item to edit based on the id
    const itemToEdit = customers.find((item) => item.id === customerId);
    // Set the form data to the values of the item to edit
    setFormData(itemToEdit);
    // Set the editId to the id of the item being edited
    setEditId(customerId);
  };

  const handleCancelEdit = () => {
    setEditId(null);
  };


  // Delete a customer
  const deleteCustomer = async (customerId) => {
    try {
      const responce = await deleteACustomerById(customerId);
      if (responce == "Customer Has Been Successfully Deleted") {
        toast.success(responce);
      } else {
        toast.error(responce);
      }
      // Refresh customer list
      fetchCustomerPages();
      // fetchCustomers();
    } catch (error) {
      toast.error(error.message);
      console.error("Error deleting customer:", error);
    }
  };

  // Search customers by coloumn name
  const filteredCustomers =
    Array.isArray(customers) &&
    customers.filter((customer) => {
      const fieldValue =
        searchColumn == "phone"
          ? customer[searchColumn]
          : customer[searchColumn].toLowerCase();
      return fieldValue.toLowerCase().includes(searchTerm.toLowerCase());
    });

  // useEffect to fetch customers on component mount and when pagination/searchTerm changes
  useEffect(() => {
    // fetchCustomers();
    fetchCustomerPages();
  }, [pagination, searchTerm, searchColumn]);

  return (
    <>
      <div className="text-end">
        <button
          style={{ width: "15%" }}
          className="btn btn-outline-danger"
          onClick={() => {
            doLogOut();
            navigate(`/login`);
          }}
        >
          LogOut
        </button>
      </div>
      <h1 className="text-center ">Customer List</h1>
      <hr />
      {/* Search */}
      <div className="row gap-2 container">
        <button
          style={{ width: "15%" }}
          className="btn btn-outline-primary"
          onClick={() => {
            navigate(`/admin/customerForm`);
          }}
        >
          Add Customer
        </button>
        <select
          style={{ width: "15%" }}
          className="form-select"
          value={searchColumn}
          onChange={(e) => setSearchColumn(e.target.value)}
        >
          <option value="first_name">Select By</option>
          <option value="first_name">First Name</option>
          <option value="city">City</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
        <input
          style={{ width: "20%" }}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
      </div>
      {/* Customer List Table */}
      <div className="table-responsive-xl">
        <table className="table">
          <thead style={{ minWidth: "70%" }}>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>State</th>
              <th>Phone</th>
              <th>City</th>
              <th style={{minWidth: '150px'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredCustomers) &&
              filteredCustomers.map((customer) => (
                <React.Fragment key={customer.id}>
                  {editId === customer.id ? (
                    <EditForm
                      customer={formData} // Pass formData to EditForm
                      onSave={(editedData) => updateCustomer(editedData)}
                      onCancel={handleCancelEdit}
                    />
                  ) : (
                    <tr key={customer.id}>
                      <td>{customer.first_name}</td>
                      <td>{customer.last_name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.address}</td>
                      <td>{customer.state}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.city}</td>
                      <td>
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => handleEdit(customer.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteCustomer(customer.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-3 text-center">
        <button
          className="btn btn-secondary"
          onClick={() =>
            setPagination({
              ...pagination,
              page:
                pagination.page == 1 ? pagination.page : pagination.page - 1,
            })
          }
        >
          Previous
        </button>
        <span className="mx-2">Page {pagination.page}</span>
        <button
          className="btn btn-secondary"
          onClick={() =>
            setPagination({ ...pagination, page: pagination.page + 1 })
          }
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Home;
