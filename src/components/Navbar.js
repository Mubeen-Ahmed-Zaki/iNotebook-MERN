import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../components Stylesheet/Navbar.css'

const Navbar = () => {
    let location = useLocation();
    const navigate = useNavigate();

    const userEmail = localStorage.getItem("email");
    const userName = localStorage.getItem("name");
    const userRole = localStorage.getItem("role");


    return (
        <nav className="navbar custom-navbar sticky-top navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand">
                    <div className="brand-icon">
                        <i className="fas fa-book"></i>
                    </div>
                    <span className="brand-text">iNotebook</span>
                </Link>
                {/* <span className="navbar-brand"><span>i</span>Notebook</span> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav navbar-navs ms-0 ms-lg-auto me-auto mb-2 mb-lg-0 mt-3 mt-lg-0 flex-md-column flex-lg-row">
                        <li className="nav-items">
                            <Link className={`nav-links ${location.pathname === "/home" ? "active" : ""}`} aria-current="page" to="/home">
                                <i className="fas fa-home"></i>
                                Home
                            </Link>
                        </li>
                        <li className="nav-items">
                            <Link className={`nav-links ${location.pathname === "/about" ? "active" : ""}`} to="/about">
                                <i className="fas fa-info-circle"></i>
                                About
                            </Link>
                        </li>
                        <li className="nav-items">
                            <Link className={`nav-links ${location.pathname === "/notes" ? "active" : ""}`} to="/notes">
                                <i className="fas fa-book"></i>
                                Notes
                            </Link>
                        </li>
                        { userRole === "admin" ? <li className="nav-items">
                            <Link className={`nav-links ${location.pathname === "/AdminFetchAllUsers" ? "active" : ""}`} to="/AdminFetchAllUsers">
                                <i className="fas fa-book"></i>
                                Users
                            </Link>
                        </li> : ''}
                    </ul>

                    {/* dropdown */}
                    {/* ---------------------------- */}
                    <div className="navbar-actions">
                        {localStorage.getItem("token") ? (
                            <div className="user-dropdown">
                                <div className="user-trigger">
                                    <div className="user-avatar">
                                        {userName ? userName.split(" ").map(word => word.charAt(0)).join("").toUpperCase() : "U"}
                                    </div>
                                    <div className="user-info">
                                        <div className="user-email">{userRole}</div>
                                        <div className="user-name">{userName || "User"}</div>
                                    </div>
                                    <i className="fas fa-chevron-down dropdown-arrow"></i>
                                </div>

                                <div className="dropdown-content">
                                    <div className="dropdown-header">
                                        {/* <div className="dropdown-avatar">
                                            {userName ? userName.charAt(0).toUpperCase() : "U"}
                                        </div> */}
                                        <div className="dropdown-user-name">{userName || "User"}</div>
                                        <div className="dropdown-user-email">{userEmail}</div>
                                        {/* <div className="dropdown-user-email"></div> */}
                                    </div>

                                    <div className="dropdown-items">
                                        {/* <div className="dropdown-divider"></div> */}
                                        <div className="dropdown-item setting" onClick={() => navigate("/setting")}>
                                            <i className="fas fa-gear dropdown-icon"></i>
                                            <span>Settings</span>
                                        </div>
                                        <div className="dropdown-item logout" onClick={() => navigate("/logout")}>
                                            <i className="fas fa-sign-out-alt dropdown-icon"></i>
                                            <span>Logout</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link to="/Login" className="action-btns login-btn">
                                    <i className="fas fa-sign-in-alt"></i>
                                    Login
                                </Link>
                                <Link to="/SignUp" className="action-btns signup-btn">
                                    <i className="fas fa-user-plus"></i>
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>


                    {/* ---------------------------- */}




                </div>
            </div>
        </nav >
    )
}

export default Navbar




// /===================================
// import { Link, useLocation } from 'react-router-dom'
// import '../components Stylesheet/Navbar.css'
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//     let location = useLocation();
//     const navigate = useNavigate();

//     // const [open, setOpen] = useState(false);
//     const userEmail = localStorage.getItem("email");

//     const handleLogout = () => {
//         localStorage.removeItem("token");   // Token hata do
//         navigate("/login");                 // Login page bhej do
//     };

//     return (
//         <nav className="navbar custom-navbar sticky-top navbar-expand-lg bg-dark navbar-dark">
//             <div className="container-fluid">
//                 <Link className="navbar-brand">
//                     <div className="brand-icon">
//                         <i className="fas fa-book"></i>
//                     </div>
//                     <span className="brand-text">iNotebook</span>
//                 </Link>
//                 {/* <span className="navbar-brand"><span>i</span>Notebook</span> */}
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul className="navbar-nav navbar-navs ms-0 ms-lg-auto me-auto mb-2 mb-lg-0 mt-3 mt-lg-0 flex-md-column flex-lg-row">
//                         <li className="nav-items">
//                             <Link className={`nav-links ${location.pathname === "/home" ? "active" : ""}`} aria-current="page" to="/home">
//                                 <i className="fas fa-home"></i>
//                                 Home
//                             </Link>
//                         </li>
//                         <li className="nav-items">
//                             <Link className={`nav-links ${location.pathname === "/about" ? "active" : ""}`} to="/about">
//                                 <i className="fas fa-info-circle"></i>
//                                 About
//                             </Link>
//                         </li>
//                         <li className="nav-items">
//                             <Link className={`nav-links ${location.pathname === "/notes" ? "active" : ""}`} to="/notes">
//                                 <i className="fas fa-book"></i>
//                                 Notes
//                             </Link>
//                         </li>
//                         <li className="nav-items">
//                             <Link className={`nav-links ${location.pathname === "/profile" ? "active" : ""}`} to="/profile">
//                                 <i className="fas fa-book"></i>
//                                 Profile
//                             </Link>
//                         </li>
//                     </ul>

//                     {/* <!-- Desktop Actions --> */}
//                     {/* <div className="navbar-actions">
//                         {localStorage.getItem("token") ? (
//                             <button className="action-btns login-btn" onClick={handleLogout}>
//                                 LogOut
//                             </button>
//                         ) : (
//                             <>
//                                 <Link to="/Login" className="action-btns login-btn">
//                                     <i className="fas fa-sign-in-alt"></i>
//                                     Login
//                                 </Link>
//                                 <Link to="/SignUp" className="action-btns signup-btn">
//                                     <i className="fas fa-user-plus"></i>
//                                     Sign Up
//                                 </Link>
//                             </>
//                         )}
//                     </div> */}
//                     <div className="navbar-actions">
//                         {localStorage.getItem("token") ? (
//                             <div className="user-menu">
//                                 <span className="user-email">
//                                     {userEmail}
//                                 </span>
//                                 <div className="dropdown-menu">
//                                     <button className="action-btns logout-btn" onClick={handleLogout}>
//                                         Logout
//                                     </button>
//                                 </div>
//                             </div>
//                         ) : (
//                             <>
//                                 <Link to="/Login" className="action-btns login-btn">
//                                     <i className="fas fa-sign-in-alt"></i>
//                                     Login
//                                 </Link>
//                                 <Link to="/SignUp" className="action-btns signup-btn">
//                                     <i className="fas fa-user-plus"></i>
//                                     Sign Up
//                                 </Link>
//                             </>
//                         )}
//                     </div>



//                 </div>
//             </div>
//         </nav >
//     )
// }

// export default Navbar