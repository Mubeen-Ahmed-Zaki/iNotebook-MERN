import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../components Stylesheet/DeleteAccount.css"; // import css file

const DeleteAccount = () => {
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [showModal, setShowModal] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  // API call for delete
  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch("https://i-notebook-mern-five.vercel.app/api/auth/deleteuser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const json = await response.json();

      if (response.ok && json.success) {
        setNotification({ message: json.msg || "Account deleted successfully", type: "success" });

        // Clear local data
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setNotification({ message: json.msg || "User does not exist!", type: "error" });
      }
    } catch (err) {
      setNotification({ message: "Server error", type: "error" });
    }

    setShowModal(false);
    setConfirmationText("");

    setTimeout(() => setNotification({ message: "", type: "" }), 4000);
  };

  return (
    <div>
      {/* Delete Button */}
      <button onClick={() => setShowModal(true)} className="btn-delete">
        <i className="fas fa-trash-alt"></i> Delete Account
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Confirm Deletion</h2>
            <p>
              This action cannot be undone. Please type <strong>"{email}"</strong> to confirm.
            </p>

            {/* Input field */}
            <input
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder="Type here"
              className="modal-input"
            />

            <div className="modal-actions">
              <button
                onClick={handleDeleteConfirm}
                disabled={confirmationText !==  email}
                className={`btn-confirm ${confirmationText !== email ? "disabled" : ""}`}
              >
                Yes, Delete
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setConfirmationText("");
                }}
                className="btn-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
