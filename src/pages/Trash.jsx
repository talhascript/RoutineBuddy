import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Trash = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const q = query(collection(db, 'Trash'), where('email', '==', user.email));
          const querySnapshot = await getDocs(q);

          const userCompletedTasks = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              email: data.email || '',
              taskName: data.taskName || '',
              taskDesc: data.taskDesc || '',
              taskType: data.taskType || '',
              date: new Date(data.dateAndTime).toLocaleDateString(),
              time: new Date(data.dateAndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
          });

          setCompletedTasks(userCompletedTasks);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching completed tasks:', error.message);
      }
    };

    fetchCompletedTasks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Navbar/>
    <div className="container-fluid">
      <div className="row">
        <div className="sidebar border border-0 col-lg-2 p-0 bg-body-tertiary bg-light">
          <div
            className="offcanvas-lg offcanvas-end bg-body-tertiary"
            tabIndex="-1"
            id="sidebarMenu"
            aria-labelledby="sidebarMenuLabel"
          >
            <div className="offcanvas-header">
              <Link
                className="d-flex align-items-baseline col-lg-2 me-0 px-0 fs-7"
                style={{
                  backgroundColor: "transparent",
                  textDecoration: "none",
                  color: "#000000",
                }}
                to="/home"
              >
                <i className="bi bi-clipboard-check-fill me-3"></i>
                <h5 className="offcanvas-title" id="sidebarMenuLabel">
                  Routine Buddy
                </h5>
              </Link>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                data-bs-target="#sidebarMenu"
                aria-label="Close"
              ></button>
            </div>

            <div
              className="offcanvas-body d-lg-flex flex-column p-0 pt-lg-3 mx-2 overflow-y-auto"
              style={{ height: "90vh" }}
            >
              <ul className="nav flex-column mb-auto">
                <li className="nav-item my-1">
                  <Link
                    className="nav-link sidebar-options d-flex align-items-baseline gap-2 rounded-pill bg-primary text-white"
                    data-menu="dashboard"
                    to="/home"
                  >
                    <i className="bi bi-house-fill"></i>
                    Home
                  </Link>
                </li>
                <li className="nav-item my-1">
                  <Link
                    className="nav-link text-black sidebar-options d-flex align-items-baseline gap-2 rounded-pill"
                    data-menu="approve"
                    to="/calendar"
                  >
                    <i className="bi bi-calendar-month"></i>
                    Calendar
                  </Link>
                </li>
                <li className="nav-item my-1">
                  <Link
                    className="nav-link text-black sidebar-options d-flex align-items-baseline gap-2 rounded-pill"
                    data-menu="student"
                    to="/completed"
                  >
                    <i className="bi bi-ui-checks"></i>
                    Completed
                  </Link>
                </li>
                <li className="nav-item my-1">
                  <Link
                    className="nav-link text-black sidebar-options d-flex align-items-baseline gap-2 rounded-pill"
                    data-menu="student"
                    to="/trash"
                  >
                    <i className="bi bi-trash-fill"></i>
                    Trash
                  </Link>
                </li>

                <li className="nav-item my-1">
                  <div className="me-2 mb-1">
                    <hr />
                    <a
                      className="nav-link text-black d-flex align-items-baseline py-2 mb-2 pe-2 ps-3 gap-2 rounded-pill"
                      data-menu="sign-out"
                      href="#"
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      Sign Out
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-10 p-4">
          <h1 style={{ textAlign: 'center' }}>Completed Tasks</h1>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {completedTasks.map((task) => (
              <li
                key={task.id}
                style={{
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  padding: '15px',
                  backgroundColor: '#f5f5f5',
                }}
              >
                
                <p style={{ marginBottom: '5px' , fontSize:'30px' }}> {task.taskName}</p>
                <p style={{ marginBottom: '5px' }}>Description: {task.taskDesc}</p>
                <p style={{ marginBottom: '5px' }}>Task Type: {task.taskType}</p>
                <p style={{ marginBottom: '5px' }}>Date of Deadline: {task.date}</p>
                <p style={{ marginBottom: '5px' }}>Time of Deadline: {task.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default Trash;
