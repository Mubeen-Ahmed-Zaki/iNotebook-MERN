// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//     const [credentials, setCredentials] = useState({
//         name: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//     });

//     const navigate = useNavigate();

//     const { name, email, password, confirmPassword } = credentials;

//     const handleSubmitSignup = async (e) => {
//         e.preventDefault();

//         const response = await fetch("http://localhost:5000/api/auth/createuser", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 name,
//                 email,
//                 password,
//                 confirmPassword,   // 👈 yeh zaroor bhejna hai
//             }),
//         });
//         if(password !== confirmPassword){
//             alert('password Not match');
//         }

//         const data = await response.json();
//         console.log("Signup response:", data);

//         if (response.ok) {
//             localStorage.setItem("token", data.authoken);
//             navigate("/login");  // redirect home
//         } else {
//             alert(data.error || (data.errors && data.errors[0].msg) || "Signup failed");
//         }
//     };


//     const onChange = (e) => {
//         setCredentials({ ...credentials, [e.target.name]: e.target.value });
//     };

//     return (
//         <form onSubmit={handleSubmitSignup}>
//             <div className="form-group">
//                 <label htmlFor="name">Name</label>
//                 <input
//                     type="text"
//                     className="form-control"
//                     id="name"
//                     name="name"
//                       value={name}
//                     onChange={onChange}
//                     placeholder="Enter your name"
//                     required
//                 />
//             </div>

//             <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     name="email"
//                       value={email}
//                     onChange={onChange}
//                     placeholder="Enter email"
//                     required
//                 />
//             </div>

//             <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     name="password"
//                       value={password}
//                     onChange={onChange}
//                     placeholder="Password"
//                     minLength={5}
//                     autoComplete="new-password"
//                     required
//                 />
//             </div>

//             <div className="form-group">
//                 <label htmlFor="confirmPassword">Confirm Password</label>
//                 <input
//                     type="password"
//                     className="form-control"
//                     id="confirmPassword"
//                     name="confirmPassword"
//                       value={confirmPassword}
//                     onChange={onChange}
//                     placeholder="Confirm Password"
//                     minLength={5}
//                     required
//                 />
//             </div>

//             <button type="submit" className="btn btn-primary mt-3">
//                 Sign Up
//             </button>
//         </form>
//     );
// };

// export default Signup;


// --------------------------------

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components Stylesheet/SignUp.css'; // Make sure to create this CSS file

const SignUp = () => {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [formProgress, setFormProgress] = useState(0);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const navigate = useNavigate();
    const signupFormWrapperRef = useRef(null);

    const { name, email, password, confirmPassword } = credentials;

    // Form validation
    const validateSignupField = (fieldName, value) => {
        let error = '';
        switch (fieldName) {
            case 'name':
                if (value.length < 3) {
                    error = 'Name must be at least 3 characters';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    error = 'Please enter a valid email address';
                }
                break;
            case 'password':
                if (value.length < 5) {
                    error = 'Password must be at least 5 characters';
                }
                break;
            case 'confirmPassword':
                if (value !== credentials.password) {
                    error = 'Passwords do not match';
                }
                break;
            default:
                break;
        }
        return error;
    };

    // Password strength checker
    const checkPasswordStrength = (pwd) => {
        let strength = 0;
        if (pwd.length >= 8) strength++;
        if (/[a-z]/.test(pwd)) strength++;
        if (/[A-Z]/.test(pwd)) strength++;
        if (/[0-9]/.test(pwd)) strength++;
        if (/[^A-Za-z0-9]/.test(pwd)) strength++;
        setPasswordStrength(strength);
    };

    // Update form progress
    useEffect(() => {
        document.title = "Login - iNotebook";
        const validFields = Object.entries(credentials).filter(([key, value]) => {
            return value.trim() !== '' && !validateSignupField(key, value);
        });
        setFormProgress((validFields.length / Object.keys(credentials).length) * 100);
    }, [credentials, validateSignupField]);

    // Handle form submission
    const handleSubmitSignup = async (e) => {
        e.preventDefault();
        
        // Validate all fields
        const newErrors = {};
        Object.entries(credentials).forEach(([key, value]) => {
            const error = validateSignupField(key, value);
            if (error) newErrors[key] = error;
        });

        // Check password match
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            shakeSignupForm();
            playErrorSound();
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password, confirmPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.authtoken);
                
                // Show success message
                setShowSuccessMessage(true);
                playSuccessSound();
                createSignupParticles();

                // Redirect after animation
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            } else {
                setErrors({ 
                    general: data.error || (data.errors && data.errors[0].msg) || "Signup failed" 
                });
                shakeSignupForm();
                playErrorSound();
            }
        } catch (error) {
            console.error("Error during signup:", error);
            setErrors({ general: "Network error. Please try again." });
            shakeSignupForm();
            playErrorSound();
        } finally {
            setIsLoading(false);
        }
    };

    // Handle input change
    const onChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
        
        // Check password strength
        if (name === 'password') {
            checkPasswordStrength(value);
        }
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    // Toggle password visibility
    const toggleSignupPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleSignupConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Shake form animation
    const shakeSignupForm = () => {
        if (signupFormWrapperRef.current) {
            signupFormWrapperRef.current.style.animation = 'signupShake 0.5s ease-in-out';
            setTimeout(() => {
                if (signupFormWrapperRef.current) {
                    signupFormWrapperRef.current.style.animation = '';
                }
            }, 500);
        }
    };

    // Sound effects
    const playSuccessSound = () => {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Success chord progression
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.4); // G5
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
            gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.8);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.8);
        } catch (e) {
            // Fallback if audio context fails
            console.log('Audio context not supported');
        }
    };

    const playErrorSound = () => {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(150, audioContext.currentTime + 0.3);
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.01);
            gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
            console.log('Audio context not supported');
        }
    };

    // Create particles effect
    const createSignupParticles = () => {
        const colors = ['#ff006e', '#8338ec', '#3a86ff', '#06ffa5', '#ffbe0b'];
        
        for (let i = 0; i < 60; i++) {
            const particle = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: 100%;
                width: ${Math.random() * 10 + 4}px;
                height: ${Math.random() * 10 + 4}px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                box-shadow: 0 0 15px ${color};
                animation: signupParticleRise ${Math.random() * 4 + 3}s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 7000);
        }
    };

    // Auto-fill demo credentials
    const autoFillSignupCredentials = () => {
        setCredentials({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            confirmPassword: 'password123'
        });
    };

    // Demo credentials hint
    useEffect(() => {
        const timer = setTimeout(() => {
            const signupHint = document.createElement('div');
            signupHint.className = 'signup-demo-hint';
            signupHint.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong>Quick Fill Demo:</strong><br>
                        Click to auto-fill form<br>
                        <small>Save time with demo data</small>
                    </div>
                    <i class="fas fa-magic signup-magic-btn"></i>
                </div>
            `;
            
            signupHint.addEventListener('click', autoFillSignupCredentials);
            document.body.appendChild(signupHint);
            
            setTimeout(() => {
                if (signupHint.parentElement) {
                    signupHint.style.opacity = '0';
                    signupHint.style.transform = 'translateX(100%)';
                    setTimeout(() => signupHint.remove(), 500);
                }
            }, 6000);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    // Get password strength class
    const getPasswordStrengthClass = () => {
        if (passwordStrength <= 2) return 'strength-weak';
        if (passwordStrength === 3) return 'strength-medium';
        if (passwordStrength === 4) return 'strength-good';
        return 'strength-strong';
    };

    // Get password strength text
    const getPasswordStrengthText = () => {
        if (passwordStrength <= 2) return 'Weak';
        if (passwordStrength === 3) return 'Medium';
        if (passwordStrength === 4) return 'Good';
        return 'Strong';
    };

    return (
        <div className="signup-container">
            {/* Left Side - Image Section */}
            <div className="signup-image-section">
                <div className="signup-floating-shapes">
                    <div className="signup-shape"></div>
                    <div className="signup-shape"></div>
                    <div className="signup-shape"></div>
                </div>
                
                <div className="signup-image-content">
                    <h1 className="signup-image-title">Join Our Community</h1>
                    <p className="signup-image-subtitle">
                        Start your journey with thousands of users who trust our platform
                    </p>
                    
                    <ul className="signup-features-list">
                        <li>
                            <div className="signup-feature-icon">
                                <i className="fas fa-check"></i>
                            </div>
                            <span>Secure & Private</span>
                        </li>
                        <li>
                            <div className="signup-feature-icon">
                                <i className="fas fa-check"></i>
                            </div>
                            <span>Easy to Use</span>
                        </li>
                        <li>
                            <div className="signup-feature-icon">
                                <i className="fas fa-check"></i>
                            </div>
                            <span>24/7 Support</span>
                        </li>
                        <li>
                            <div className="signup-feature-icon">
                                <i className="fas fa-check"></i>
                            </div>
                            <span>Free Forever</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Right Side - Form Section */}
            <div className="signup-form-section">
                <div className="signup-form-wrapper" ref={signupFormWrapperRef}>
                    {/* Progress Bar */}
                    <div className="signup-form-progress" style={{ width: `${formProgress}%` }}></div>
                    
                    <div className="signup-form-header">
                        <h2 className="signup-form-title">Create Account</h2>
                        <p className="signup-form-subtitle">Fill in your details to get started</p>
                    </div>

                    {/* Success Message */}
                    {showSuccessMessage && (
                        <div className="signup-success-message">
                            <i className="fas fa-check-circle me-2"></i>
                            Account created successfully! Redirecting to login... 🎉
                        </div>
                    )}

                    {/* General Error */}
                    {errors.general && (
                        <div className="signup-error-message signup-general-error">
                            <i className="fas fa-exclamation-triangle me-2"></i>
                            {errors.general}
                        </div>
                    )}

                    {/* Social Signup Options */}
                    <div className="signup-social-login">
                        <button type="button" className="signup-social-btn signup-google-btn">
                            <i className="fab fa-google"></i>
                            Continue with Google
                        </button>
                        <button type="button" className="signup-social-btn signup-facebook-btn">
                            <i className="fab fa-facebook-f"></i>
                            Continue with Facebook
                        </button>
                    </div>

                    <div className="signup-divider">
                        <span>or sign up with email</span>
                    </div>

                    {/* Signup Form */}
                    <form onSubmit={handleSubmitSignup} className="signup-form">
                        {/* Name Field */}
                        <div className="signup-form-group">
                            <input
                                type="text"
                                className={`signup-form-input ${errors.name ? 'invalid' : name ? 'valid' : ''}`}
                                id="name"
                                name="name"
                                value={name}
                                onChange={onChange}
                                placeholder="Full Name"
                                required
                            />
                            <i className="fas fa-user signup-input-icon"></i>
                            {name && !errors.name && <i className="fas fa-check-circle signup-valid-icon"></i>}
                            {errors.name && <div className="signup-error-message">{errors.name}</div>}
                        </div>

                        {/* Email Field */}
                        <div className="signup-form-group">
                            <input
                                type="email"
                                className={`signup-form-input ${errors.email ? 'invalid' : email ? 'valid' : ''}`}
                                id="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="Email Address"
                                required
                            />
                            <i className="fas fa-envelope signup-input-icon"></i>
                            {email && !errors.email && <i className="fas fa-check-circle signup-valid-icon"></i>}
                            {errors.email && <div className="signup-error-message">{errors.email}</div>}
                        </div>

                        {/* Password Field */}
                        <div className="signup-form-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`signup-form-input ${errors.password ? 'invalid' : password ? 'valid' : ''}`}
                                id="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="Password"
                                required
                                autoComplete="new-password"
                                minLength={5}
                            />
                            <i className="fas fa-lock signup-input-icon"></i>
                            <i 
                                className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} signup-password-toggle`}
                                onClick={toggleSignupPassword}
                            ></i>
                            {password && !errors.password && <i className="fas fa-check-circle signup-valid-icon"></i>}
                            
                            {/* Password Strength Indicator */}
                            {password && (
                                <div className="signup-password-strength">
                                    <div className={`signup-strength-bar ${getPasswordStrengthClass()}`}></div>
                                    <span className="signup-strength-text">{getPasswordStrengthText()}</span>
                                </div>
                            )}
                            {errors.password && <div className="signup-error-message">{errors.password}</div>}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="signup-form-group">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className={`signup-form-input ${errors.confirmPassword ? 'invalid' : confirmPassword ? 'valid' : ''}`}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={onChange}
                                placeholder="Confirm Password"
                                required
                                minLength={5}
                            />
                            <i className="fas fa-lock signup-input-icon"></i>
                            <i 
                                className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} signup-password-toggle`}
                                onClick={toggleSignupConfirmPassword}
                            ></i>
                            {confirmPassword && !errors.confirmPassword && confirmPassword === password && 
                                <i className="fas fa-check-circle signup-valid-icon"></i>}
                            {errors.confirmPassword && <div className="signup-error-message">{errors.confirmPassword}</div>}
                        </div>

                        {/* Terms Checkbox */}
                        <div className="signup-form-group">
                            <label className="signup-terms-checkbox">
                                <input type="checkbox" required />
                                <span>I agree to the <a href="#terms">Terms & Conditions</a> and <a href="#privacy">Privacy Policy</a></span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className={`signup-submit-btn ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {!isLoading && (
                                <>
                                    <i className="fas fa-user-plus me-2"></i>
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    <div className="signup-form-footer">
                        <p>
                            Already have an account? 
                            <Link to="/login" onClick={() => navigate('/login')}>Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;