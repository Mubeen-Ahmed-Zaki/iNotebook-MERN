import React from 'react'
import { Link } from 'react-router-dom'
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
                                <li><Link to="/home"><i className="fas fa-home"></i> Home</Link></li>
                                <li><Link to="/notes"><i className="fas fa-sticky-note"></i> Notes</Link></li>
                                <li><Link to="/signup"><i className="fas fa-play-circle"></i> Get started</Link></li>
                            </ul>
                        </div>

                        {/* <!-- Services Section --> */}
                        <div className="footer-section">
                            <h3 className="footer-title">Services</h3>
                            <ul className="footer-links">
                                <li><Link to="/notes"><i className="fas fa-file-alt"></i> Your Notes</Link></li>
                                <li><Link to="/addNote"><i className="fas fa-plus-circle"></i> New Note</Link></li>
                            </ul>
                        </div>

                        {/* <!-- Account Section --> */}
                        <div className="footer-section">
                            <h3 className="footer-title">Account</h3>
                            <ul className="footer-links">
                                <li><Link to="/signin"><i className="fas fa-sign-in-alt"></i> Sign-in</Link></li>
                                <li><Link to="/signup"><i className="fas fa-user-plus"></i> Join Free</Link></li>
                            </ul>
                        </div>

                        {/* <!-- Top Categories Section --> */}
                        <div className="footer-section">
                            <h3 className="footer-title">Top Categories</h3>
                            <ul className="footer-links">
                                <li><Link to="/notes"><i className="fas fa-campground"></i> Tent Notes</Link></li>
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
                                <Link to="https://www.facebook.com" target='_blank' className="social-icon facebook">
                                    <i className="fab fa-facebook-f"></i>
                                </Link>
                                <Link to="https://www.twitter.com" target='_blank' className="social-icon twitter">
                                    <i className="fab fa-twitter"></i>
                                </Link>
                                <Link to="https://www.instagram.com" target='_blank' className="social-icon instagram">
                                    <i className="fab fa-instagram"></i>
                                </Link>
                                <Link to="https://www.linkedin.com/in/mubeen-zaki-2157511b1" target='_blank' className="social-icon linkedin">
                                    <i className="fab fa-linkedin-in"></i>
                                </Link>
                                <Link to="https://www.youtube.com" target='_blank' className="social-icon youtube">
                                    <i className="fab fa-youtube"></i>
                                </Link>
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
