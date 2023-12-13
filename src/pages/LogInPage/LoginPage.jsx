import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config"; 
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sign in user with email and password
      await signInWithEmailAndPassword(auth, email, password);
      alert("Successfully Logged In");

          // Extract the username from the email
      const username = email.split('@')[0];

    // Redirect to HomePage with username as a prop
      window.location.href = `/home`;

      
    } catch (error) {
      // Check if the error is due to a network issue
      if (error.code === "auth/network-request-failed") {
        alert(
          "Network request failed. Please check your internet connection and try again."
        );
      } else {
        alert(`Error logging in: ${error.message}`);
      }
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Login
                    </p>
                    <form className="mx-1 mx-md-4" onSubmit={handleLogin}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label ps-1"
                            htmlFor="form3Example3c"
                          >
                            Your Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="yourname@gmail.com"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label ps-1"
                            htmlFor="form3Example4c"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Password123"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                    <p className="text-center">
                      Don't have an account?{" "}
                      <Link className="text-decoration-none" to="/signup">
                        Sign Up
                      </Link>
                    </p>

                    <p className="text-center">
                      Forgot Password?{" "}
                      <Link className="text-decoration-none" to="/forgot">
                        Click Here
                      </Link>
                    </p>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
