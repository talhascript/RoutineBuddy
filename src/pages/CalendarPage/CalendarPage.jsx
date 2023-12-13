import React from "react";
import { Link } from "react-router-dom";
import "../../styles/global.css";
import "../../components/Calendar";
import Calendar from "../../components/Calendar";

const CalendarPage = () => {
  return (
    <>
     

      <div class="container-fluid">
        <div class="row">
          <div class="sidebar border border-0 col-lg-2 p-0 bg-body-tertiary bg-light">
            <div
              className="offcanvas-lg offcanvas-end bg-body-tertiary"
              tabIndex="-1"
              id="sidebarMenu"
              aria-labelledby="sidebarMenuLabel"
            >
              <div className="offcanvas-header">
                <a
                  className="d-flex align-items-baseline col-lg-2 me-0 px-0 fs-7"
                  style={{
                    backgroundColor: "transparent",
                    textDecoration: "none",
                    color: "#000000",
                  }}
                  href="#"
                >
                  <i className="bi bi-clipboard-check-fill me-3"></i>
                  <h5 className="offcanvas-title" id="sidebarMenuLabel">
                    Routine Buddy
                  </h5>
                </a>
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
                      className="nav-link text-black sidebar-options d-flex align-items-baseline gap-2 rounded-pill "
                      data-menu="dashboard"
                      to="/home"
                    >
                      <i className="bi bi-house-fill"></i>
                      Home
                    </Link>
                  </li>
                  <li className="nav-item my-1">
                    <Link
                      className="nav-link sidebar-options d-flex align-items-baseline gap-2 rounded-pill bg-primary text-white"
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
                </ul>

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
              </div>
            </div>
          </div>

          <main class="ms-sm-auto col-lg-10 px-lg-4">
            <div className="container w-75 py-5">
              <Calendar />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
