import React, { useState } from "react";
import { toast } from "react-toastify";

const EditForm = ({ customer, onSave, onCancel }) => {
  const [editedData, setEditedData] = useState({ ...customer });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    if (
      editedData.first_name &&
      editedData.last_name &&
      editedData.address &&
      editedData.city &&
      editedData.state &&
      editedData.email &&
      editedData.phone &&
      editedData.street &&
      editedData.phone.length >= 10
    ) {
      onSave(editedData);
    } else {
      if (editedData.phone.length < 10) {
        toast.error("Phone number must be at least 10 characters");
      } else {
        toast.error("All fields are required");
      }
    }
  };

  return (
    <tr>
      <td >
        <input
          className="editable"
          type="text"
          name="first_name"
          value={editedData.first_name}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          className="editable"
          type="text"
          name="last_name"
          value={editedData.last_name}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          className="editable"
          disabled={true}
          type="text"
          name="email"
          value={editedData.email}
        />
      </td>
      <td>
        <input
          className="editable"
          type="text"
          name="address"
          value={editedData.address}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          className="editable"
          type="text"
          name="state"
          value={editedData.state}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          className="editable"
          type="number"
          name="phone"
          value={editedData.phone}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          className="editable"
          type="text"
          name="city"
          value={editedData.city}
          onChange={handleChange}
        />
      </td>
      <td className="d-flex" style={{minWidth: '150px'}}>
        <button className="btn btn-outline-success me-1" onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-outline-danger" onClick={onCancel}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditForm;
