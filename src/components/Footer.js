import React from 'react'
import '../components Stylesheet/Footer.css'

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-main">
                        {/* <!-- Company Section --> */}
                        <div className="footer-section">
                            <h3 className="footer-title">Company</h3>
                            <ul className="footer-links">
                                <li><a href="#home"><i className="fas fa-home"></i> Home</a></li>
                                <li><a href="#notes"><i className="fas fa-sticky-note"></i> New Notes</a></li>
                                <li><a href="#about"><i className="fas fa-info-circle"></i> About us</a></li>
                                <li><a href="#started"><i className="fas fa-play-circle"></i> Get started</a></li>
                            </ul>
                        </div>

                        {/* <!-- Services Section --> */}
                        <div className="footer-section">
                            <h3 className="footer-title">Services</h3>
                            <ul className="footer-links">
                                <li><a href="#your-notes"><i className="fas fa-file-alt"></i> Your Notes</a></li>
                                <li><a href="#new-note"><i className="fas fa-plus-circle"></i> New Note</a></li>
                            </ul>
                        </div>

                        {/* <!-- Account Section --> */}
                        <div className="footer-section">
                            <h3 className="footer-title">Account</h3>
                            <ul className="footer-links">
                                <li><a href="#signin"><i className="fas fa-sign-in-alt"></i> Sign-in</a></li>
                                <li><a href="#join"><i className="fas fa-user-plus"></i> Join Free</a></li>
                            </ul>
                        </div>

                        {/* <!-- Top Categories Section --> */}
                        <div className="footer-section">
                            <h3 className="footer-title">Top Categories</h3>
                            <ul className="footer-links">
                                <li><a href="#tent"><i className="fas fa-campground"></i> Tent Notes</a></li>
                                <li><a href="#rv"><i className="fa-solid fa-caravan"></i>RV and Van Notes</a></li>
                                <li><a href="#canoe"><i className="fas fa-ship"></i> Canoe Notes</a></li>
                                <li><a href="#survival"><i className="fas fa-mountain"></i> Survivalist Notes</a></li>
                            </ul>
                        </div>

                        {/* <!-- About iNotebook Section --> */}
                        <div className="footer-section">
                            <span className="footer-logo">
                            <i className="fas fa-book"></i>
                                iNotebook
                            </span>
                            <p className="footer-description">
                                An online web platform where you can create, edit, upload, delete your notes/information privately and securely without any disturbance
                            </p>
                            <div className="social-icons">
                                <a href="#facebook" className="social-icon facebook">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#twitter" className="social-icon twitter">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#instagram" className="social-icon instagram">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="#linkedin" className="social-icon linkedin">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                                <a href="#youtube" className="social-icon youtube">
                                    <i className="fab fa-youtube"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Footer Bottom --> */}
                    <div className="footer-bottom">
                        <div className="footer-copyright">
                            Copyright © 2021 iNotebook. All rights reserved
                        </div>
                        <div className="footer-legal">
                            <a href="#privacy">Privacy policy</a>
                            <a href="#terms">Terms & condition</a>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer
