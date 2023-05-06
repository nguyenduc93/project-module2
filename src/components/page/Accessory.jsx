import React, { useEffect, useState } from "react";
import Navbarr from "../navbar/Navbarr";
import Footer from "../footer/Footer";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Accessory(props) {
  const [product, setProduct] = useState([]);
  const loadProduct = async () => {
    const result = await axios.get("http://localhost:8000/products");
    if (result.data.some((product) => product.category === "Phụ Kiện")) {
      setProduct(
        result.data.filter((product) => product.category === "Phụ Kiện")
      );
    } else {
      setProduct([]);
    }
  };
  // console.log(product);
  useEffect(() => {
    loadProduct();
  }, []);
  // Hàm đổi tiền tệ
  const formatCurrency = (value) => {
    return parseFloat(value).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  return (
    <div>
      <Navbarr />
      <div className="textGuitar">
        <h2>Phụ Kiện</h2> <hr />
      </div>
      <div className="product">
        {/* <div className="card-group"> */}
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
                      <small className="text-muted cartSmall">
                        <button>
                          <i className="fa-solid fa-cart-shopping"></i>
                        </button>
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {/* <div className="col-md-3">
              <div className="card">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/fir-project-filebase.appspot.com/o/img2.jpg?alt=media&token=6a1f23a3-2b13-41de-8c31-e05198290be8"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This card has supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/fir-project-filebase.appspot.com/o/img3.jpg?alt=media&token=407d2e8b-f772-4be9-af17-d6d4b8acfd15"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This card has even longer
                    content than the first to show that equal height action.
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/fir-project-filebase.appspot.com/o/img4.jpg?alt=media&token=0b0e219a-11a9-4e00-9001-1d262d7a4052"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </p>
                </div>
              </div>
            </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Accessory;
