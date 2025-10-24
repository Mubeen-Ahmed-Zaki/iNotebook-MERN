import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components Stylesheet/Login.css'; // Make sure to create this CSS file


const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // const [formProgress, setFormProgress] = useState(0);
    const navigate = useNavigate();
    const formWrapperRef = useRef(null);

    const { email, password } = credentials;

    // Update form progress
    useEffect(() => {
        document.title = "Login - iNotebook";
    }, []);

    const [stats, setStats] = useState({ users: 0, notes: 0, uptime: 0, support: 0 });
    // Stats fetch
    useEffect(() => {
        fetch("http://localhost:5000/api/status/stats")
            .then((res) => res.json())
            .then((data) => setStats(data))
            .catch((err) => console.error("Error fetching stats:", err));
    }, []);

    // Counter animation
    const [counts, setCounts] = useState({ users: 0, notes: 0, uptime: 0, support: 0 });

    useEffect(() => {
        const animateCounter = (key, target) => {
            let start = 0;
            const increment = target / 100; // 100 steps
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    start = target;
                    clearInterval(timer);
                }
                setCounts((prev) => ({ ...prev, [key]: Math.floor(start) }));
            }, 20);
        };

        animateCounter("users", stats.users);
        animateCounter("notes", stats.notes);
    }, [stats]);
    
    // Format function
    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M+";
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + "K+";
        } else {
            return Math.floor(num) + (num === 99 ? ".9%" : "+");
        }
    };

    // Handle form submission
    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrors({});

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const json = await res.json();

            if (res.ok) {
                // Save token from backend
                localStorage.setItem("token", json.authToken);

                const userRes = await fetch("http://localhost:5000/api/auth/getuser", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": json.authToken,
                    },
                });

                const userJson = await userRes.json();

                if (userJson.user) {
                    localStorage.setItem("name", userJson.user.name);
                    localStorage.setItem("email", userJson.user.email);
                    localStorage.setItem("role", userJson.user.role);
                }

                // Show success message
                setShowSuccessMessage(true);
                playSuccessSound();
                createParticles();

                // Redirect after animation
                setTimeout(() => {
                    navigate("/home");
                }, 2000);
            } else {
                setErrors({ general: json.message || "Invalid credentials" });
                playErrorSound();
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrors({ general: "Network error. Please try again." });
            playErrorSound();
        } finally {
            setIsLoading(false);
        }
    };

    // Handle input change
    const onChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    // Toggle password visibility
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    // Sound effects
    const playSuccessSound = () => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    };

    const playErrorSound = () => {
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
    };

    // Create particles effect
    const createParticles = () => {
        const colors = ['#ff006e', '#8338ec', '#3a86ff', '#ffbe0b'];

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];

            particle.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: 100%;
                width: ${Math.random() * 8 + 4}px;
                height: ${Math.random() * 8 + 4}px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                box-shadow: 0 0 10px ${color};
                animation: particleRise ${Math.random() * 3 + 2}s ease-out forwards;
            `;

            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 5000);
        }
    };



    return (
        <div className="login-container">

            {/* Left Side - Form Section */}
            <div className="form-section1">
                <div className="form-wrapper1" ref={formWrapperRef}>
                    <div className="form-header">
                        <h2 className="form-title">Welcome Back</h2>
                        <p className="form-subtitle">Sign in to your account</p>
                    </div>

                    {/* Success Message */}
                    {showSuccessMessage && (
                        <div className="success-message">
                            <i className="fas fa-check-circle me-2"></i>
                            Login successful! Redirecting... 🎉
                        </div>
                    )}

                    {/* General Error */}
                    {errors.general && (
                        <div className="error-message general-error">
                            <i className="fas fa-exclamation-triangle me-2"></i>
                            {errors.general}
                        </div>
                    )}

                    {/* Social Login Options */}
                    <div className="social-login">
                        <button type="button" className="social-btn google-btn">
                            <i className="fab fa-google"></i>
                            Continue with Google
                        </button>
                        <button type="button" className="social-btn facebook-btn">
                            <i className="fab fa-facebook-f"></i>
                            Continue with Facebook
                        </button>
                    </div>

                    <div className="divider">
                        <span>or sign in with email</span>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmitLogin} className="login-form">
                        {/* Email Field */}
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-input"
                                id="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="Email Address"
                            />
                            <i className="fas fa-envelope input-icon"></i>
                        </div>

                        {/* Password Field */}
                        <div className="form-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-input"
                                id="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="Password"
                                required
                                autoComplete="current-password"
                            />
                            <i className="fas fa-lock input-icon"></i>
                            <i
                                className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
                                onClick={togglePassword}
                            ></i>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="remember-section">
                            <label className="remember-checkbox">
                                <input type="checkbox" required />
                                <span>Remember me</span>
                            </label>
                            <div className="forgot-password">
                                <Link to="/forgot">Forgot Password?</Link>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`submit-btn ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {!isLoading && (
                                <>
                                    <i className="fas fa-sign-in-alt me-2"></i>
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    <div className="form-footer">
                        <p>
                            Don't have an account?
                            <Link to="/signup" onClick={() => navigate('/signup')}>Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Image Section */}
            <div className="image-section">
                <div className="floating-shapes">
                    <div className="shape"></div>
                    <div className="shape"></div>
                    <div className="shape"></div>
                </div>

                <div className="image-content">
                    <h1 className="image-title"><span style={{ color: "#a076ec" }}>i</span>Notebook</h1>
                    <p className="image-subtitle">
                        Your digital notebook for organized learning and productivity
                    </p>

                    <div className="stats-grids">
                        <div className="stat-items">
                            <div className="stat-numbers">{formatNumber(counts.users)}</div>
                            <div className="stat-labels">Happy Users</div>
                        </div>
                        <div className="stat-items">
                            <div className="stat-numbers">{formatNumber(counts.notes)}</div>
                            <div className="stat-labels">Notes Created</div>
                        </div>
                        <div className="stat-items">
                            <div className="stat-numbers">99.9%</div>
                            <div className="stat-labels">Uptime</div>
                        </div>
                        <div className="stat-items">
                            <div className="stat-numbers">24/7</div>
                            <div className="stat-labels">Support</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;