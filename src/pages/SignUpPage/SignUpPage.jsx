// Import necessary libraries
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase-config";


// Define the SignUp component
const SignUp = () => {
  // State variables for name, email, password, and repeated password
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");


  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Check if passwords match
      if (password !== repeatPassword) {
        alert("Passwords don't match");
        return;
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );


      // Redirect or perform any other actions after successful signup and login
      alert("Account created and logged in successfully!");
      window.location.href = "/";

      await saveName();
    } catch (error) {
      // Handle error during signup or login
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already in use. Please use a different email.");
      } else {
        alert(`Error creating account: ${error.message}`);
      }
    }
  };

  const saveName = async () => {
    try {
      const user = auth.currentUser;
  

      // Save user's name in the created document in the Name field
      await setDoc(doc(db, "Users", user.uid), {
        Name: name,
        id : user.uid,
        Email : email
      });
  
      // Additional actions after saving the name, if needed
      console.log("Name saved successfully!");
    } catch (error) {
      console.error(`Error saving name: ${error.message}`);
    }
  };




  // JSX structure for the component
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
                      Sign up
                    </p>
                    <form className="mx-1 mx-md-4" onSubmit={(e) => { handleSignUp(e); saveName(); }}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label ps-1" htmlFor="name">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
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
                            value={email}
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
                            placeholder="password123"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label ps-1"
                            htmlFor="form3Example4cd"
                          >
                            Repeat your password
                          </label>
                          <input
                            type="password"
                            id="repeatPassword"
                            className="form-control"
                            placeholder="password123"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-4">
                        <p className="text-center">
                          Already Have An Account?{" "}
                          <Link className="text-decoration-none" to="/">
                            Log In
                          </Link>
                        </p>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Register
                        </button>
                      </div>
                    </form>
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

// Export the component
export default SignUp;
