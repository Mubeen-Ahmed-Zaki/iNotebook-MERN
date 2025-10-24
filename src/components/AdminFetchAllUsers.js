import React, { useEffect, useState } from "react";
import '../components Stylesheet/AdminFetchAllUsers.css'

const AdminFetchAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Backend se users fetch karna
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized! Please login first.");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:5000/api/auth/fetchallusers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.msg || "Failed to fetch users");
        }

        setUsers(data.users || []);
        setFilteredUsers(data.users || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Search filter
  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, users]);

  // Highlight text
  const highlightText = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, `<span class="highlight">$1</span>`);
  };

  return (
    <div className="users-container">
      <h2 className="users-title">All Registered Users</h2>

      {/* Search bar */}
      <div className="table-controls">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm("")}>
              <i className="fas fa-times"></i>
            </button>
          )}
          <i className="fas fa-search search-icon"></i>
        </div>

        <div className="table-stats">
          <div className="stat-item">Total: {users.length}</div>
          <div className="stat-item">Showing: {filteredUsers.length}</div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p style={{ color: "white", textAlign: "center" }}>Loading users...</p>
      ) : error ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : filteredUsers.length === 0 ? (
        <div className="no-results">
          <i className="fas fa-search"></i>
          <h3>No users found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>user id</th>
              <th>User#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>User CretedAt</th>
              <th>User UpdatedAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user._id}</td>
                <td>{user.userNumber}</td>
                <td dangerouslySetInnerHTML={{ __html: highlightText(user.name) }} />
                <td dangerouslySetInnerHTML={{ __html: highlightText(user.email) }} />
                <td>
                  <span className={`role-badge role-${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                
                {/* <td>{new Date(user.date).toLocaleString()}</td> */}

                <td>{user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"}</td>
                <td>{user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "N/A"}</td>
                <td><i className="fas fa-trash" role="button"></i></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminFetchAllUsers;