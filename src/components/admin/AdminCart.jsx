import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminCart(props) {
  const [cartList, setCartList] = useState([]);
  const [users, setUsers] = useState([]);

  const loadListCarts = async () => {
    const result = await axios.get("http://localhost:8000/listCarts");
    setCartList(result.data);

    const uniqueUsers = [...new Set(result.data.map((cart) => cart.userCarts))];
    setUsers(uniqueUsers);
  };

  useEffect(() => {
    loadListCarts();
  }, []);

  const formatCurrency = (value) => {
    return parseFloat(value).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const totalAmount = (user) => {
    const cartItems = cartList.filter((cart) => cart.userCarts === user);
    const total = cartItems.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.quantity * currentValue.priceCarts,
      0
    );
    return formatCurrency(total);
  };
  // Hàm chỉnh đăng xuất
  const navigate = useNavigate();
  const handleButtonn = () => {
    navigate("/login");
    localStorage.removeItem("currentUser");
  };
  return (
    <div>
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-secondary">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/"
              className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            ></Link>

            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
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
          <div className="container">
            <h2 style={{ marginLeft: 350 }}>
              Đơn Hàng Chờ Xác Nhận Thanh Toán
            </h2>
            {users.map((user, index) => (
              <React.Fragment key={index}>
                <table className="table table-product">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Ảnh Sản Phẩm</th>
                      <th>Tên Sản Phẩm</th>
                      <th>Số Lượng</th>
                      <th>Đơn Giá</th>
                      <th>Thành Tiền</th>
                    </tr>
                  </thead>
                  <tbody id="datarow" className="formCart">
                    {cartList
                      .filter((cart) => cart.userCarts === user)
                      .map((cart, index) => (
                        <tr className="productCart" key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <img
                              src={cart.imageCarts}
                              className="hinhdaidien"
                              width={100}
                              height={70}
                              alt="Product thumbnail"
                            />
                          </td>
                          <td>{cart.nameCarts}</td>
                          <td className="text-right">{cart.quantity}</td>
                          <td className="text-right">
                            {formatCurrency(cart.priceCarts)}
                          </td>
                          <td className="text-right">
                            {formatCurrency(cart.quantity * cart.priceCarts)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>
                        <p>{user}</p>
                      </td>
                      <td colSpan="4" className="text-right">
                        <strong>Tổng Tiền:</strong>
                      </td>
                      <td className="text-right">{totalAmount(user)}</td>
                    </tr>
                  </tfoot>
                </table>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCart;
