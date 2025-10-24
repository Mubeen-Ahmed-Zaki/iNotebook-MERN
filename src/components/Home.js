import Notes from "./Notes"
import { Link } from "react-router-dom"
import imagehero from '../assests/images/hero4.gif'
import '../components Stylesheet/Home.css'
import { useEffect } from "react"
import React,{ useNavigate } from "react-router-dom"


const Home = () => {
  const navigate = useNavigate();
   useEffect(() => {
     document.title = "Home - iNotebook";
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);
  
  return (
    <>
      <div className="container-fluid margin">
        <div className="container">
          <div className="row flex-md-row-reverse d-flex align-items-center">
            <div className="col-md-6 d-flex justify-content-start justify-content-md-end">
              <img
                src={imagehero}
                alt="Hero Illustration"
                className="img-fluid"
                style={{ height: "500px", "mix-blend-mode": "multiply" }}
              />
            </div>
            <div className="col-md-6">
              <div className="hero-data ms-md-5 ms-lg-0">
                <h1 className="page-title"><span>i</span>Notebook</h1>
                <h2 className="text-white fw-bold">Your Notebook on Cloud - safe and secure</h2>
                <p className="hero-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas quibusdam vel hic, perferendis culpa quasi provident dolor enim voluptas tempora at omnis dicta sunt voluptatem minima dolorem similique <Link to="/about" className="link">about page</Link> totam sequi?</p>

                <div className="mt-5">
                  <Link to="/addNote" className="open-modal-btn">
                    <i className="fas fa-plus me-2"></i>
                    Add New Note
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>
      {/* decleare Notes components */}
      <Notes />

    </>
  )
}

export default Home