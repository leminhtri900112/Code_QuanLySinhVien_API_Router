import { NavLink } from "react-router-dom";
import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-light bg-success">
          <a className="navbar-brand" href="#">
            CyberSoft
          </a>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <NavLink
                  exact
                  activeClassName="text-danger"
                  className="nav-link"
                  to="/"
                >
                  Trang chủ
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="text-danger"
                  className="nav-link"
                  to="/dssv"
                >
                  Danh sách
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
