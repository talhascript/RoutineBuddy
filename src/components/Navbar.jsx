import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



import {
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
  collection,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

const Navbar = () => {

    const [userName, setUserName] = useState("");

    useEffect(() => {
      // Function to fetch the user's name from Firestore
      const fetchUserName = async () => {
        try {
          const user = auth.currentUser;
  
          if (user) {
            // Retrieve the user document from Firestore based on the user's email
            const q = query(collection(db, "Users"), where("Email", "==", user.email));
            const querySnapshot = await getDocs(q);
  
            if (!querySnapshot.empty) {
              const userDoc = querySnapshot.docs[0].data();
  
              // Check if the document has a Name field
              if (userDoc.Name) {
                setUserName(userDoc.Name);
              }
            }
  
            // Listen for changes in the user's document (real-time updates)
            // const unsubscribe = onSnapshot(q, (snapshot) => {
            //   if (!snapshot.empty) {
            //     const userDoc = snapshot.docs[0].data();
  
            //     // Check if the document has a Name field
            //     if (userDoc.Name) {
            //       setUserName(userDoc.Name);
            //     }
            //   }
            // });
  
            // // Unsubscribe when the component unmounts
            // return () => unsubscribe();
          }
        } catch (error) {
          console.error(`Error fetching user name: ${error.message}`);
        }
      };
  
      fetchUserName();
    }, []);
  
  return (
    <>
    <header
      className="navbar sticky-top bg-dark flex-md-nowrap shadow p-0 m-0"
      data-bs-theme="dark"
    >
      <Link
        className="navbar-brand d-flex col-lg-2 px-3 fs-7 text-white"
        to="/home"
      >
        <i
          className="bi bi-clipboard2-check-fill px-2"
          // style={{ fontSize: "x-large", marginRight: "1.2rem" }}
        ></i>
        Routine Buddy
      </Link>

      <ul class="navbar-nav flex-row d-lg-none">
        <li class="nav-item text-nowrap">
          <button
            class="nav-link px-3 text-white bg-dark border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="bi bi-list"></i>
          </button>
        </li>
      </ul>

      <p className="d-lg-flex d-none text-white bg-primary px-3 py-2 rounded-pill my-0 me-3">
      Welcome {userName}
      </p>
    </header>
    </>
  )
}

export default Navbar;