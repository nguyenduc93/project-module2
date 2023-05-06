import React, { useState, useEffect } from "react";
import "./Navbarr.css";
import { NavLink, Link } from "react-router-dom";
function Navbarr(props) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Lấy số lượng sản phẩm từ props và cập nhật giá trị cho biến state
    setCartCount(props.cartCount);
  }, [props.cartCount]);
  const handleButton = () => {
    localStorage.removeItem("currentUser");
  };
  return (
    <div className="container2">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/fir-project-filebase.appspot.com/o/Logo-White-500x500.png?alt=media&token=dae92abe-4445-4189-9df5-53831dc3bbae"
              alt=""
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/page/guitar"
                >
                  <span>Đàn Guitar</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/page/phukien">
                  <span>Phụ Kiện Guitar</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/page/tuhoc">
                  <span>Tự Học Guitar</span>
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="/page/nhaccu"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span>Nhạc Cụ Khác</span>
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      <span>Đàn Ukulele</span>
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <span> Đàn Kalimba</span>
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <span> Kèn Harmonica</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>

            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Tìm Kiếm..."
                aria-label="Search"
              />
              <button className="btn btn-outline buttonIcon" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
          <div className="register">
            {user ? (
              user.permission === "admin" ? (
                // Đã đăng nhập và là admin
                <>
                  <div className="dropdown" style={{ textAlign: "center" }}>
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Xin chào Admin !!
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li style={{ paddingBottom: 20 }}>
                        <NavLink to={"/admin/product"}>
                          <div className="nameUser">
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                            >
                              Admin nào!
                            </button>
                          </div>
                        </NavLink>
                      </li>
                      {/* <li>
                        <NavLink to={"/login"}>
                          <div className="nameUser">
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                            >
                              {user.phone}
                            </button>
                          </div>
                        </NavLink>
                      </li> */}
                      <li>
                        <NavLink to={"/login"}>
                          <div className="nameUser">
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={handleButton}
                            >
                              Đăng Xuất !!
                            </button>
                          </div>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                // Đã đăng nhập và là user
                <>
                  <div className="dropdown" style={{ textAlign: "center" }}>
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Xin Chào. {user.name}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li style={{ paddingBottom: 5 }}>
                        <NavLink>
                          <div className="nameUser">
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                            >
                              Thay Đổi TT
                            </button>
                          </div>
                        </NavLink>
                      </li>
                      {/* <li style={{ paddingBottom: 20 }}>
                        <NavLink to={"/login"}>
                          <div className="nameUser">
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                            >
                              {user.phone}
                            </button>
                          </div>
                        </NavLink>
                      </li> */}
                      <li>
                        <NavLink to={"/login"}>
                          <div className="nameUser">
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={handleButton}
                            >
                              Đăng Xuất !!
                            </button>
                          </div>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </>
              )
            ) : (
              // Chưa đăng nhập
              <>
                <NavLink to={"/login"}>
                  <div>
                    <button>Đăng Nhập</button>
                  </div>
                </NavLink>
                <NavLink to={"/register"}>
                  <div>
                    <button>Đăng Ký</button>
                  </div>
                </NavLink>
              </>
            )}

            <Link to={"/page/cart"}>
              <div className="cart">
                <button>
                  <i className="fa-solid fa-cart-shopping"></i>
                  {cartCount > 0 && <span className="badge">{cartCount}</span>}
                </button>
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbarr;
