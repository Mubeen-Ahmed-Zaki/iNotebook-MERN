import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import '../components Stylesheet/About.css'

const About = () => {
  const [stats, setStats] = useState({ users: 0, notes: 0, uptime: 0, support: 0 });

  //  Stats fetch
  useEffect(() => {
    fetch("https://i-notebook-mern-five.vercel.app/api/status/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  //  Counter animation
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
    animateCounter("uptime", stats.uptime);
    animateCounter("support", stats.support);


    document.title = "About - iNotebook";
    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    // Start counter animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelectorAll(".stat-number").forEach((counter) => {
            animateCounter(counter);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    });

    const statsSection = document.querySelector(".stats-section");
    if (statsSection) {
      statsObserver.observe(statsSection);
    }

    // Smooth scrolling for hero button
    const heroBtn = document.querySelector(".hero-btn");
    if (heroBtn) {
      heroBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    }

    // Parallax effect for hero section
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const heroSection = document.querySelector(".hero-section");

      if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    // cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      statsObserver.disconnect();
    };
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

  return (
    <>
      {/* <!-- Hero Section --> */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">About <span style={{ color: "#a076ec", letterspacing: "1px" }}>i</span>Notebook</h1>
            <p className="hero-subtitle">
              Empowering students and professionals with smart note-taking solutions
            </p>
            <a href="#mission" className="hero-btn">
              <i className="fas fa-arrow-down me-2"></i>
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* <!-- Mission Section --> */}
      <section className="about-section mission-section" id="mission">
        <div className="container">
          <div className="section-title animate-on-scroll">
            <h2>Our Mission</h2>
            <p>Revolutionizing the way students and professionals organize their thoughts and knowledge</p>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="feature-card animate-on-scroll">
                <div className="feature-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <h3 className="feature-title">Educational Excellence</h3>
                <p className="feature-text">
                  We provide students with tools to excel in their academic journey through organized note-taking and knowledge management.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="feature-card animate-on-scroll">
                <div className="feature-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3 className="feature-title">Secure & Private</h3>
                <p className="feature-text">
                  Your notes are protected with enterprise-grade security. Create, edit, and store your information with complete privacy.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="feature-card animate-on-scroll">
                <div className="feature-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3 className="feature-title">Community Driven</h3>
                <p className="feature-text">
                  Join thousands of students and professionals who trust iNotebook for their daily note-taking and organization needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Story Section --> */}
      <section className="about-section story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text animate-on-scroll">
              <h2 className="story-title">Our Story</h2>
              <p className="story-description">
                Founded in 2021 by a team of passionate educators and developers, iNotebook was born from the need to bridge the gap between traditional note-taking and digital innovation. We recognized that students needed a platform that was both powerful and intuitive.
              </p>
              <p className="story-description">
                Today, we serve over 50,000 students and professionals worldwide, helping them organize their thoughts, collaborate on projects, and achieve their academic and professional goals.
              </p>
              <ul className="stats-list">
                <li>
                  <div className="stats-icon">
                    <i className="fas fa-check"></i>
                  </div>
                  {formatNumber(counts.users)} Active Users Worldwide
                </li>
                <li>
                  <div className="stats-icon">
                    <i className="fas fa-check"></i>
                  </div>
                  {formatNumber(counts.notes)} Notes Created and Managed
                </li>
                <li>
                  <div className="stats-icon">
                    <i className="fas fa-check"></i>
                  </div>
                  99.9% Uptime and Reliability
                </li>
                <li>
                  <div className="stats-icon">
                    <i className="fas fa-check"></i>
                  </div>
                  24/7 Customer Support
                </li>
              </ul>
            </div>
            <div className="story-image animate-on-scroll">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Students collaborating" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Stats Section --> */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item animate-on-scroll">
              <div className="stat-number">{formatNumber(counts.users)}</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item animate-on-scroll">
              <div className="stat-number">{formatNumber(counts.notes)}</div>
              <div className="stat-label">Notes Created</div>
            </div>
            <div className="stat-item animate-on-scroll">
              <div className="stat-number">{formatNumber(counts.uptime)}</div>
              <div className="stat-label">Uptime %</div>
            </div>
            <div className="stat-item animate-on-scroll">
              <div className="stat-number">{formatNumber(counts.support)}</div>
              <div className="stat-label">Hours Support</div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Technology Section --> */}
      <section className="about-section tech-section">
        <div className="container">
          <div className="tech-grid">
            <div className="tech-image animate-on-scroll">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Technology" className="img-fluid" />
            </div>
            <div className="tech-text animate-on-scroll">
              <h2 className="story-title">Cutting-Edge Technology</h2>
              <p className="story-description">
                Built with modern technologies and best practices, iNotebook ensures lightning-fast performance, seamless synchronization, and robust security for all your notes and data.
              </p>
              <ul className="tech-features">
                <li>
                  <div className="stats-icon">
                    <i className="fas fa-bolt"></i>
                  </div>
                  Lightning-fast performance with optimized algorithms
                </li>
                <li>
                  <div className="stats-icon">
                    <i className="fas fa-cloud"></i>
                  </div>
                  Real-time cloud synchronization across devices
                </li>
                <li>
                  <div className="stats-icon">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  Mobile-first responsive design
                </li>
                <li>
                  <div className="stats-icon">
                    <i className="fas fa-lock"></i>
                  </div>
                  End-to-end encryption for data security
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Team Section --> */}
      <section className="about-section team-section">
        <div className="container">
          <p>Do you want to write down your ideas here? <br />
            You can add your personal notes — whether they are study points, daily tasks, or important reminders. <br />
            Every note makes your productivity easier and more organized. Give it a try!</p>
          <Link to="/AddNote" className="mt-5 hero-btn">
            <i className="fas fa-plus me-2"></i>
            Add New Notes
          </Link>
        </div>
      </section>

      {/* <!-- Call to Action --> */}
      <section className="text-center" style={{ padding: "80px 0" }}>
        <div className="container">
          <div className="animate-on-scroll">
            <h2 className="ready-heading">Ready to Transform Your Note-Taking?</h2>
            <p className="ready-text">
              Join thousands of students and professionals who have already discovered the power of organized, digital note-taking.
            </p>
            <Link to="/signup" className="hero-btn">
              <i className="fas fa-rocket me-2"></i>
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>

      {/* footer */}
      <Footer />
    </>
  );
};

export default About;
