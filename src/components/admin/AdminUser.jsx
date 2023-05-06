import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function AdminUser(props) {
  const [users, setUsers] = useState([]);
  const [userStatuses, setUserStatuses] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const loadUser = async () => {
    const result = await axios.get("http://localhost:8000/users");
    setUsers(result.data);
    setUserStatuses(result.data.map((user) => user.status));
  };

  const handleButton = async (index) => {
    const updatedUserStatuses = [...userStatuses];
    if (updatedUserStatuses[index] === 1) {
      updatedUserStatuses[index] = 0;
      const updatedUser = {
        ...users[index],
        status: 0,
      };
      await axios.patch(
        `http://localhost:8000/users/${updatedUser.id}`,
        updatedUser
      );
    } else if (updatedUserStatuses[index] === 0) {
      updatedUserStatuses[index] = 1;
      const updatedUser = {
        ...users[index],
        status: 1,
      };
      await axios.patch(
        `http://localhost:8000/users/${updatedUser.id}`,
        updatedUser
      );
    }
    setUserStatuses(updatedUserStatuses);
    setSelectedIndex(index);
  };

  useEffect(() => {
    loadUser();
  }, []);
  // Hàm chỉnh đăng xuất
  const navigate = useNavigate();
  const handleButtonn = () => {
    navigate("/login");
    localStorage.removeItem("currentUser");
  };
  return (
    <div>
      <div>
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
                {/* <li className="nav-item">
                  <a
                    href="../index.html"
                    className="nav-link align-middle px-0"
                  >
                    <img
                      src="../image/logo xwatch.png"
                      alt=""
                      style={{ backgroundColor: "rgb(52, 49, 49)", width: 150 }}
                    />
                  </a>
                </li> */}
                <li className="nav-item">
                  <Link to="/admin">
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
                  <a href="#" className="nav-link px-0 align-middle">
                    <i className="fa-solid fa-user"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline text-info">
                      Quản Lí Người Dùng
                    </span>
                  </a>
                </li>
                <li className="w-100">
                  <NavLink to="/admin/cart" className="nav-link px-0">
                    <i className="fa-brands fa-app-store"></i>{" "}
                    <span className="d-none d-sm-inline text-info">
                      Quản Lý Giỏ Hàng
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
          <div className="col py-3">
            <div className="container ">
              {/* Phần xử lý người dùng  */}

              <div id="renderListUser">
                <table className="table table-product">
                  <tbody>
                    <tr className="table-primary">
                      <th scope="col">STT</th>
                      <th scope="col">Tên Người Dùng</th>
                      <th scope="col">Địa Chỉ Email</th>
                      <th scope="col">Mật Khẩu</th>
                      <th scope="col">Phân Loại</th>
                      <th scope="col">Trạng Thái</th>
                      <th scope="col">Khóa User</th>
                    </tr>
                    {users.map((user, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{user.permission}</td>
                        <td>
                          {userStatuses[index] === 1
                            ? "Kích hoạt"
                            : "Chưa kích hoạt"}
                        </td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleButton(index)}
                          >
                            {userStatuses[index] === 0 ? "Mở khóa" : "Khóa"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUser;
