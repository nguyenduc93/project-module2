import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Navbarr from "../navbar/Navbarr";
import Footer from "../footer/Footer";
import axios from "axios";

function Cart(props) {
  const [listCarts, setListCarts] = useState([]);
  const [userCartQuantities, setUserCartQuantities] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const loadListCarts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/listCarts");
      const userCartList = response.data.filter(
        (cart) => cart.userCarts === currentUser.email
      );
      setListCarts(userCartList);
      setUserCartQuantities(new Array(userCartList.length).fill(1));

      // Lấy thông tin sản phẩm cho từng sản phẩm trong giỏ hàng
      userCartList.forEach((cart) => {
        loadProducts(cart.id_product);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    loadListCarts();
    // loadProducts();
  }, []);

  const handleIncreaseQuantity = (index) => {
    const newQuantities = [...userCartQuantities];
    newQuantities[index]++;
    setUserCartQuantities(newQuantities);
  };

  const handleDecreaseQuantity = (index) => {
    const newQuantities = [...userCartQuantities];
    if (newQuantities[index] > 1) {
      newQuantities[index]--;
      setUserCartQuantities(newQuantities);
    }
  };
  // Hàm lấy thông tin products
  const [products, setProduct] = useState("");
  const loadProducts = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/products/${productId}`
      );
      const product = response.data;
      setProduct(product);
    } catch (error) {
      console.error(error);
    }
  };

  // Hàm cập nhật số lượng tồn kho
  const updateProductQuantity = async (productId, quantity) => {
    try {
      await axios.patch(`http://localhost:8000/products/${productId}`, {
        quantity,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = async () => {
    // Hàm để xóa danh sách sản phẩm trong giỏ hàng của người dùng hiện tại
    const deleteCartByUserEmail = async (userEmail) => {
      try {
        const response = await axios.get("http://localhost:8000/listCarts");
        const carts = response.data;

        carts.forEach(async (cart) => {
          if (cart.userCarts === userEmail) {
            await axios.delete(`http://localhost:8000/listCarts/${cart.id}`);
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    try {
      // Xóa giỏ hàng của người dùng
      await deleteCartByUserEmail(currentUser.email);

      // Lặp qua danh sách sản phẩm đã được thanh toán và cập nhật số lượng trong kho hàng
      listCarts.forEach(async (listCart, index) => {
        await updateProductQuantity(
          listCart.id_product,
          products.quantity - userCartQuantities[index]
        );
      });

      // Tạo thông tin đơn hàng từ listCarts và userCartQuantities
      const items = listCarts.map((listCart, index) => {
        return {
          id: listCart.id,
          name: listCart.nameCarts,
          price: parseFloat(listCart.priceCarts),
          quantity: userCartQuantities[index],
        };
      });

      // Gửi yêu cầu POST đến endpoint `/orders`
      await axios.post("http://localhost:8000/orders", {
        userCarts: currentUser.email,
        items,
        total: listCarts.reduce((acc, cart, index) => {
          return acc + parseFloat(cart.priceCarts) * userCartQuantities[index];
        }, 0),
      });

      setListCarts([]);
      setUserCartQuantities([]);
      setPaymentStatus("success");
    } catch (error) {
      console.error(error);
      setPaymentStatus("failure");
    }
  };

  // Hàm xóa 1 sản phẩm
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/listCarts/${productId}`);
      // console.log("Xóa sản phẩm thành công!");
      const updatedCarts = listCarts.filter((cart) => cart.id !== productId);
      setListCarts(updatedCarts);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Navbarr />
      <div>
        <main role="main">
          {/* Block content - Đục lỗ trên giao diện bố cục chung, đặt tên là `content` */}
          <div className="container mt-4">
            <div
              id="thongbao"
              className="alert alert-danger d-none face"
              role="alert"
            >
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <h1 className="text-center">Giỏ hàng</h1>
            <div className="row">
              <div className="col col-md-12">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Ảnh Sản Phẩm</th>
                      <th>Tên Sản Phẩm</th>
                      <th>Số Lượng</th>
                      <th>Đơn Giá</th>
                      <th>Thành Tiền</th>
                      <th>Hành Động</th>
                    </tr>
                  </thead>
                  <tbody id="datarow" className="formCart">
                    {listCarts.map((listCart, index) => {
                      return (
                        <tr className="productCart" key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <img
                              src={listCart.imageCarts}
                              className="hinhdaidien"
                              width={100}
                              height={70}
                            />
                          </td>
                          <td>{listCart.nameCarts}</td>
                          <td className="text-right">
                            <div className="buttons_added">
                              <button
                                className="minus is-form"
                                onClick={() => handleDecreaseQuantity(index)}
                              >
                                -
                              </button>
                              <input
                                aria-label="quantity"
                                className="input-qty"
                                max="Số tối đa"
                                min="1"
                                name=""
                                type="number"
                                value={userCartQuantities[index]}
                                onChange={(event) => {
                                  const newQuantities = [...userCartQuantities];
                                  newQuantities[index] = parseInt(
                                    event.target.value
                                  );
                                  setUserCartQuantities(newQuantities);
                                }}
                              />
                              <button
                                className="plus is-form"
                                onClick={() => handleIncreaseQuantity(index)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="text-right">
                            {parseFloat(listCart.priceCarts).toLocaleString(
                              "vi-VN",
                              { style: "currency", currency: "VND" }
                            )}
                          </td>
                          <td className="text-right">
                            {(
                              parseFloat(listCart.priceCarts) *
                              userCartQuantities[index]
                            ).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </td>
                          <td>
                            <button
                              id={`delete_${listCart.id}`}
                              data-sp-ma={2}
                              className="btn btn-danger btn-delete-sanpham"
                              onClick={() => handleDeleteProduct(listCart.id)}
                            >
                              <i className="fa fa-trash" aria-hidden="true" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="5" className="text-right">
                        <strong>Tổng Tiền:</strong>
                      </td>
                      <td className="text-right">
                        {listCarts
                          .reduce((acc, cart, index) => {
                            return (
                              acc +
                              parseFloat(cart.priceCarts) *
                                userCartQuantities[index]
                            );
                          }, 0)
                          .toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                      </td>
                      <td />
                    </tr>
                  </tfoot>
                </table>
                <div className="backHome">
                  <NavLink to="/" className="btn btn-warning btn-md">
                    <i className="fa fa-arrow-left" aria-hidden="true" />
                    Quay về trang chủ
                  </NavLink>
                  <button
                    href="checkout.html"
                    className="btn btn-primary btn-md"
                    onClick={handleCheckout}
                  >
                    <i className="fa fa-shopping-cart" aria-hidden="true" />
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div id="thongbao" className="alert face" role="alert">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Đóng"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            {paymentStatus === "success" && (
              <div
                className="alert alert-success"
                role="alert"
                style={{ textAlign: "center" }}
              >
                <h3>Thanh Toán Thành Công</h3>
              </div>
            )}
            {paymentStatus === "failure" && (
              <div
                className="alert alert-danger"
                role="alert"
                style={{ textAlign: "center" }}
              >
                <h3>Lỗi khi thanh toán</h3>
              </div>
            )}
          </div>

          {/* End block content */}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
