import React, { useState, useEffect } from "react";
import "./Home.css";
import Slide from "../slide/Slide";
import Navbarr from "../navbar/Navbarr";
import Footer from "../footer/Footer";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Home(props) {
  const [product, setProduct] = useState([]);
  const [listCarts, setListCarts] = useState([]);
  const loadProduct = async () => {
    const result = await axios.get("http://localhost:8000/products");
    setProduct(result.data);
  };
  // Post user đang nhập vào trong giỏ hàng
  const [currentUser, setCurrentUser] = useState(null);
  // Lấy thông tin người dùng từ localStorage khi component được render
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  const loadListCarts = async () => {
    const result = await axios.get("http://localhost:8000/listCarts");
    setListCarts(result.data);
  };
  // Thêm sản phẩm vào giỏ hàng
  const handleAddToCart = async (product) => {
    if (!currentUser) {
      return alert("Bạn phải đăng nhập để thêm sản phẩm vào giỏ hàng !");
    }
    const existingCartItem = listCarts.find(
      (item) =>
        item.id_product === product.id && item.userCarts === currentUser.email
    );
    if (existingCartItem) {
      return alert("Sản phẩm đã có trong giỏ hàng !");
    }
    await axios.post("http://localhost:8000/listCarts", {
      nameCarts: product.name,
      priceCarts: product.price,
      imageCarts: product.image_url,
      quantityCarts: product.quantity,
      quantity: 1,
      id_product: product.id,
      userCarts: currentUser.email,
    });
    loadListCarts();
  };

  useEffect(() => {
    loadProduct();
    loadListCarts();
  }, []);
  // <-- Cập nhật state currentUser khi người dùng đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };
  const cartCount = currentUser
    ? listCarts.filter((item) => item.userCarts === currentUser.email).length
    : 0;
  // Hàm đổi tiền tệ
  const formatCurrency = (value) => {
    return parseFloat(value).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  return (
    <div>
      <Navbarr
        currentUser={currentUser}
        cartCount={cartCount}
        onLogout={handleLogout}
      />
      <Slide />
      <div className="extention-service">
        <div className="grid">
          <div className="grid__row service-row">
            <div className="grid__column-12-4 service-wrap">
              <img
                className="extention-service-icon"
                src="https://theme.hstatic.net/200000388065/1000766714/14/vice_item_1.png?v=111"
                alt=""
              />
              <h3 className="extention-content">Giao hàng miễn phí</h3>
              <p>với đơn hàng từ 20tr trở lên</p>
            </div>
            <div className="grid__column-12-4 service-wrap">
              <img
                className="extention-service-icon"
                src="https://theme.hstatic.net/200000388065/1000766714/14/vice_item_2.png?v=111"
                alt=""
              />
              <h3 className="extention-content">Hỗ trợ online 24/7</h3>
              <p>Hỗ trợ online/offline 24/7</p>
            </div>
            <div className="grid__column-12-4 service-wrap">
              <img
                className="extention-service-icon"
                src="https://theme.hstatic.net/200000388065/1000766714/14/vice_item_3.png?v=111"
                alt=""
              />
              <h3 className="extention-content">Đặt hàng trực tuyến</h3>
              <p>Hotline : 0975.771.793</p>
            </div>
            <div className="grid__column-12-4 service-wrap">
              <img
                className="extention-service-icon"
                src="https://theme.hstatic.net/200000388065/1000766714/14/vice_item_4.png?v=111"
                alt=""
              />
              <h3 className="extention-content">Miễn phí đổi trả</h3>
              <p>Trong vòng 7 ngày</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-divider">
        <h2>
          <i
            className="fa fa-star"
            aria-hidden="true"
            style={{ color: "gray" }}
          />{" "}
          Sản Phẩm Nổi Bật
        </h2>
      </div>
      <div className="product">
        <div className="card-group">
          <div className="row">
            {product.map((products, index) => {
              return (
                <div className="col-md-3" style={{ marginBottom: 10 }}>
                  <div className="card cardProduct" key={index}>
                    <NavLink to={`/guitar/detail/${products.id}`}>
                      <img
                        height={300}
                        src={products.image_url}
                        className="card-img-top"
                        alt="..."
                      />
                    </NavLink>
                    <div className="card-body">
                      <h5 className="card-title">{products.name}</h5>
                      <p className="card-text">
                        Giá: {formatCurrency(products.price)}
                      </p>
                      <p className="card-text">Loại Đàn: {products.category}</p>
                      <p className="card-text">
                        Thương Hiệu: {products.origin}
                      </p>
                      {products.quantity <= 0 ? (
                        <div style={{ marginLeft: 90 }}>
                          <h4>Hết Hàng</h4>
                        </div>
                      ) : (
                        <p className="card-text">
                          <small className="text-muted cartSmall">
                            <button onClick={() => handleAddToCart(products)}>
                              <i className="fa-solid fa-cart-shopping"></i>
                            </button>
                          </small>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
