import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../App";
import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    axios.get(`${BASE_URL}/api/users`).then((res) => {
      setUsers(res.data.data);
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${BASE_URL}/api/users/${id}`).then(() => loadUsers());
  };

  return (
    <div className="user-list-container">
      <h2 className="text-theme">User List</h2>
      <div className="text-end mb-3">
        <Link to="/user-create" className="btn btn-primary">Create</Link>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped text-nowrap mb-0">
          <thead className="table-header text-white bg-theme">
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
            </thead>

          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id}>
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`/user-edit/${user.id}`} className="btn btn-sm btn-warning me-2">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(user.id)} className="btn btn-sm btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
