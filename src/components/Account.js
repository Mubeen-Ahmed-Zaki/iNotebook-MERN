import { useNavigate } from "react-router-dom";
import DeleteAccount from "./DeleteAccount";
import { useEffect } from "react";

const Account = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Account settings - iNotebook";
  }, []);

  return (
    <div id="account-section" className="s-content-section rounded-bottom">
      <div className="content-header">
        <h1 className="s-content-title">Account</h1>
        <p className="content-subtitle">Manage your account settings and security</p>
      </div>

      <div className="settings-section">
        <h3 className="s-section-title">Account Actions</h3>

        <div className="setting-items">
          <div className="setting-info">
            <div className="setting-label">Logout</div>
            <div className="setting-description">Sign out from your current session</div>
          </div>
          <div className="setting-control">
            <button className="btn-logout" onClick={() => navigate("/logout")}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>

        <div className="setting-items">
          <div className="setting-info">
            <div className="setting-label">Delete Account</div>
            <div className="setting-description">Permanently delete your account and all data</div>
          </div>
          <div className="setting-control">
            <DeleteAccount />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
