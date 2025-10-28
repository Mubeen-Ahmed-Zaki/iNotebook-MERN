
import React, { useState, useEffect } from "react";

const Personal = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [notification, setNotification] = useState({ message: "", type: "" });
  // for password show
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    document.title = "Personal settings - iNotebook";
  }, []);

  //  Pehle se login user ka data fetch karo
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://i-notebook-mern-five.vercel.app/api/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });

        const json = await response.json();
        if (response.ok) {
          setFullName(json.user.name);
          setEmail(json.user.email);

          // localStorage update bhi kar lo (optional)
          localStorage.setItem("name", json.user.name);
          localStorage.setItem("email", json.user.email);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  //  Handle Profile Save
  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://i-notebook-mern-five.vercel.app/api/auth/updateuser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ name: fullName, email }), //  backend expects "name"
      });

      const json = await response.json();
      if (response.ok) {

        setFullName(json.user.name);
        setEmail(json.user.email);
        // localStorage update karo
        localStorage.setItem("name", json.user.name);
        localStorage.setItem("email", json.user.email);
        localStorage.setItem("role", json.user.role);

        setNotification({ message: "Profile updated successfully", type: "success" });
      } else {
        setNotification({ message: json.msg || "Failed to update profile", type: "error" });
      }
    } catch (err) {
      setNotification({ message: "Server error while updating profile", type: "error" });
    }

    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  //  Handle Password Save
  const handlePasswordSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://i-notebook-mern-five.vercel.app/api/auth/updateuser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ currentPassword, password: newPassword, confirmPassword }), //  backend expects "password"
      });

      const json = await response.json();
      if (response.ok) {

        // optionally clear password fields
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setNotification({ message: "Password updated successfully", type: "success" });
      } else {
        setNotification({ message: json.msg || "Failed to update password", type: "error" });
      }
    } catch (err) {
      setNotification({ message: "Server error while updating password", type: "error" });
    }

    setTimeout(() => setNotification({ message: "", type: "" }), 130000);
  };

  // Reset profile form
  const resetButton = () => {
    setFullName("");
    setEmail("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div id="personal-section" className="s-content-section rounded-bottom">
      <div className="content-header">
        <h1 className="s-content-title">Personal</h1>
        <p className="content-subtitle">Update your personal information and password</p>
      </div>

      {/* Profile Info */}
      <div className="settings-section">
        <h3 className="s-section-title">Profile Information</h3>
        <div className="profile-section">
          <form id="profileForm" onSubmit={handleProfileSave}>
            <div className="profile-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  className="form-inputs"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="emailAddress">Email Address</label>
                <input
                  type="email"
                  className="form-inputs"
                  id="emailAddress"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="actions-buttons">
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-save"></i> Save Changes
              </button>
              <button type="button" className="btn btn-outline" onClick={resetButton}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* password section */}
      <div className="settings-section">
        <h3 className="s-section-title">Change Password</h3>
        <div className="password-section">
          <form id="passwordForm" onSubmit={handlePasswordSave}>
            {/* <form id="passwordForm"> */}
            <div className="form-group">
              <label className="form-label" htmlFor="currentPassword">Current Password</label>
              <div className="position-relative">
                {/* Current Password */}
                <input
                  type={showCurrent ? "text" : "password"}
                  className="form-inputs"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
                <i
                  style={{ bottom: "-18px" }}
                  className={`fas ${showCurrent ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
                  onClick={() => setShowCurrent(!showCurrent)}
                ></i>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="newPassword">New Password</label>
              <div className="position-relative">
                {/* New Password */}
                <input
                  type={showNew ? "text" : "password"}
                  className="form-inputs"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                <i
                  style={{ bottom: "-18px" }}
                  className={`fas ${showNew ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
                  onClick={() => setShowNew(!showNew)}
                ></i>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
              <div className="position-relative">
                {/* Confirm Password */}
                <input
                  type={showConfirm ? "text" : "password"}
                  className="form-inputs"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
                <i
                  style={{ bottom: "-18px" }}
                  className={`fas ${showConfirm ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
                  onClick={() => setShowConfirm(!showConfirm)}
                ></i>
              </div>
            </div>
            <div className="actions-buttons">
              <button type="submit" className="btn btn-primary"
                disabled={!currentPassword || !newPassword || !confirmPassword}>
                <i className="fas fa-key"></i> Update Password
              </button>
              <button type="button" className="btn btn-outline" onClick={resetButton}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Notification */}
      {
        notification.message && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )
      }
    </div >
  );
};

export default Personal;
// import React, { useState, useEffect } from "react";

// const Personal = () => {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [notification, setNotification] = useState({ message: "", type: "" });
//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     document.title = "Personal settings - iNotebook";
//   }, []);

//   // Toggle password visibility
//   const togglePassword = () => {
//     setShowPassword(!showPassword);
//   };

//   //  Pehle se login user ka data fetch karo
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch("https://i-notebook-mern-five.vercel.app/api/auth/getuser", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "auth-token": localStorage.getItem("token"),
//           },
//         });

//         const json = await response.json();
//         if (response.ok) {
//           setFullName(json.user.name);
//           setEmail(json.user.email);

//           // localStorage update bhi kar lo (optional)
//           localStorage.setItem("name", json.user.name);
//           localStorage.setItem("email", json.user.email);
//         }
//       } catch (err) {
//         console.error("Error fetching user:", err);
//       }
//     };

//     fetchUser();
//   }, []);

//   //  Handle Profile Save
//   const handleProfileSave = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("https://i-notebook-mern-five.vercel.app/api/auth/updateuser", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           "auth-token": localStorage.getItem("token"),
//         },
//         body: JSON.stringify({ name: fullName, email }), //  backend expects "name"
//       });

//       const json = await response.json();
//       if (response.ok) {
//         setNotification({ message: "Profile updated successfully", type: "success" });

//         // localStorage update karo
//         localStorage.setItem("name", json.user.name);
//         localStorage.setItem("email", json.user.email);

//         setFullName(json.user.name);
//         setEmail(json.user.email);
//       } else {
//         setNotification({ message: json.msg || "Failed to update profile", type: "error" });
//       }
//     } catch (err) {
//       setNotification({ message: "Server error while updating profile", type: "error" });
//     }

//     setTimeout(() => setNotification({ message: "", type: "" }), 3000);
//   };

//   // Reset profile form
//   const resetProfile = () => {
//     setFullName("");
//     setEmail("");
//   };

//   return (
//     <div id="personal-section" className="s-content-section rounded-bottom">
//       <div className="content-header">
//         <h1 className="s-content-title">Personal</h1>
//         <p className="content-subtitle">Update your personal information and password</p>
//       </div>

//       {/* Profile Info */}
//       <div className="settings-section">
//         <h3 className="s-section-title">Profile Information</h3>
//         <div className="profile-section">
//           <form id="profileForm" onSubmit={handleProfileSave}>
//             <div className="profile-grid">
//               <div className="form-group">
//                 <label className="form-label" htmlFor="fullName">Full Name</label>
//                 <input
//                   type="text"
//                   className="form-inputs"
//                   id="fullName"
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                   placeholder="Enter your full name"
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="form-label" htmlFor="emailAddress">Email Address</label>
//                 <input
//                   type="email"
//                   className="form-inputs"
//                   id="emailAddress"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>
//             <div className="actions-buttons">
//               <button type="submit" className="btn btn-primary">
//                 <i className="fas fa-save"></i> Save Changes
//               </button>
//               <button type="button" className="btn btn-outline" onClick={resetProfile}>
//                 Reset
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* password section */}
//       <div className="settings-section">
//         <h3 className="s-section-title">Change Password</h3>
//         <div className="password-section">
//           <form id="passwordForm">
//             <div className="form-group">
//               <label className="form-label" htmlFor="currentPassword">Current Password</label>
//               <div className="position-relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className="form-inputs"
//                   id="currentPassword"
//                   placeholder="Enter current password"
//                 />
//                 <i
//                   style={{ bottom: "-18px" }}
//                   className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
//                   onClick={togglePassword}
//                 ></i>
//               </div>
//             </div>
//             <div className="form-group">
//               <label className="form-label" htmlFor="newPassword">New Password</label>
//               <div className="position-relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className="form-inputs"
//                   id="newPassword"
//                   placeholder="Enter new password"
//                 />
//                 <i
//                   style={{ bottom: "-18px" }}
//                   className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
//                   onClick={togglePassword}
//                 ></i>
//               </div>
//             </div>
//             <div className="form-group">
//               <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
//               <div className="position-relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className="form-inputs"
//                   id="confirmPassword"
//                   placeholder="Confirm new password"
//                 />
//                 <i
//                   style={{ bottom: "-18px" }}
//                   className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
//                   onClick={togglePassword}
//                 ></i>
//               </div>
//             </div>
//             <div className="actions-buttons">
//               <button type="submit" className="btn btn-primary">
//                 <i className="fas fa-key"></i> Update Password
//               </button>
//               <button type="button" className="btn btn-outline" onClick={resetProfile}>
//                 Reset
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Notification */}
//       {notification.message && (
//         <div className={`notification ${notification.type}`}>
//           {notification.message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Personal;
