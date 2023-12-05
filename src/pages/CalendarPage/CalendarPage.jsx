import React from "react";
import { Link } from "react-router-dom";
import "../../styles/global.css";
import "../../components/Calendar";
import Calendar from "../../components/Calendar";

const CalendarPage = () => {
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
          UserName
        </p>
      </header>

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
                      to="/"
                    >
                      <i className="bi bi-ui-checks"></i>
                      Completed
                    </Link>
                  </li>
                  <li className="nav-item my-1">
                    <Link
                      className="nav-link text-black sidebar-options d-flex align-items-baseline gap-2 rounded-pill"
                      data-menu="student"
                      to="/"
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
