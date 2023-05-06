import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Admin(props) {
  const navigate = useNavigate();
  const handleButtonn = () => {
    navigate("/login");
    localStorage.removeItem("currentUser");
  };
  return (
    <div className="containerAdmin">
      {" "}
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-secondary ">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a
              href="/"
              className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            ></a>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="nav-item">
                <Link to="/">
                  <i className="fa-solid fa-house"></i>
                  <span className="ms-1 d-none d-sm-inline text-info">
                    Home
                  </span>
                </Link>
              </li>
              <ul
                className="collapse show nav flex-column ms-1"
                id="submenu1"
                data-bs-parent="#menu"
              >
                <li className="w-100">
                  <NavLink to="/admin/product" className="nav-link px-0">
                    <i className="fa-brands fa-app-store"></i>{" "}
                    <span className="d-none d-sm-inline text-info">
                      Quản Lý Cửa Hàng
                    </span>
                  </NavLink>
                </li>
              </ul>
              <li>
                <NavLink
                  to="/admin/user"
                  className="nav-link px-0 align-middle"
                >
                  <i className="fa-solid fa-user"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline text-info">
                    Quản Lí Người Dùng
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/cart"
                  className="nav-link px-0 align-middle"
                >
                  <i className="fa-solid fa-user"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline text-info">
                    Quản Lí Đơn Hàng
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className="nav-link px-0 align-middle logout"
                >
                  <i className="fa-solid fa-right-from-bracket"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline text-info">
                    <button onClick={handleButtonn}>Đăng Xuất</button>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="btn btn-warning btn-md">
                  <i className="fa fa-arrow-left" aria-hidden="true" />
                  Quay về trang chủ
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
