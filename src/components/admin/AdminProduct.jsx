import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { storage } from "../../firebase/Firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import axios from "axios";
import "./admin.css";
import { Modal, Button } from "react-bootstrap";
function AdminProduct(props) {
  // State upload ảnh lên
  const [imageUpload, setImageUpload] = useState(null);
  // State lấy url ảnh về
  const [imageUrls, setImageUrls] = useState([]);
  // Tạo storage lưu trữ từ dịch vụ của firebase
  const imagesListRef = ref(storage, "images/");

  // Viết hàm upload
  const uploadFile = () => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `images/${imageUpload.name}`);

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  // Lấy dữ liệu trả về từ firebase

  useEffect(() => {
    listAll(imagesListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  const [categories, setCategories] = useState([]);
  const loadCategory = async () => {
    const result = await axios.get("http://localhost:8000/category");
    setCategories(result.data);
  };
  useEffect(() => {
    loadCategory();
  }, []);
  // Set lại giá trị khi thêm ảnh thành công
  useEffect(() => {
    setImageUpload(null);
  }, [imageUrls]);
  // Xử lý các ô Input
  const [product, setProduct] = useState({
    name: "",
    origin: "",
    description: "",
    price: 0,
    image_url: "",
    quantity: 1,
    category: "",
  });

  const {
    nameProduct,
    originProduct,
    descriptionProduct,
    priceProduct,
    url,
    quantityProduct,
    category,
  } = product;

  const handleInputChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Load danh sách sản phẩm trong db
  const [products, setProducts] = useState([]);
  const loadProducts = async () => {
    const result = await axios.get("http://localhost:8000/products");
    setProducts(result.data);
  };
  // Thêm mới sản phẩm
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      ...product,
      image_url: imageUrls[imageUrls.length - 1],
    };
    await axios.post("http://localhost:8000/products", newProduct);
    newProduct = "";
    loadProducts();
  };
  useEffect(() => {
    loadProducts();
  }, []);
  // Hàm sử lý sửa sản phẩm
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // Hàm chỉnh sửa sản phẩm và ảnh
  const handleEditProduct = async (updatedProduct) => {
    try {
      // Nếu có ảnh mới được upload, thực hiện upload và lấy link ảnh
      let newImageUrl = updatedProduct.image_url;
      if (imageUpload !== null) {
        const imageRef = ref(storage, `images/${imageUpload.name}`);
        await uploadBytes(imageRef, imageUpload);
        const snapshot = await getDownloadURL(imageRef);
        newImageUrl = snapshot;
      }

      // Cập nhật thông tin sản phẩm
      const productToUpdate = {
        ...updatedProduct,
        image_url: newImageUrl,
      };
      const response = await axios.put(
        `http://localhost:8000/products/${updatedProduct.id}`,
        productToUpdate
      );

      // Cập nhật danh sách sản phẩm
      setProducts((prev) =>
        prev.map((product) =>
          product.id === updatedProduct.id ? productToUpdate : product
        )
      );

      // Đóng modal chỉnh sửa sản phẩm
      setEditingProduct(null);
      setShowModal(false);

      // Set lại state cho ảnh upload
      setImageUpload(null);
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm xóa sản phẩm
  const handleDeleteProduct = async (id) => {
    await axios.delete(`http://localhost:8000/products/${id}`);
    loadProducts();
  };
  // Hàm chỉnh đăng xuất
  const navigate = useNavigate();
  const handleButtonn = () => {
    navigate("/login");
    localStorage.removeItem("currentUser");
  };
  // Hàm chuyển đổi đơn vị tiền
  const formatCurrency = (value) => {
    return parseFloat(value).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <div>
      {editingProduct && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Chỉnh Sửa Sản Phẩm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="image_url">Ảnh sản phẩm:</label>
              {editingProduct.image_url && (
                <img
                  src={editingProduct.image_url}
                  alt="Product"
                  width={100}
                  height={100}
                />
              )}
              <input
                type="file"
                className="form-control-file"
                id="image_url"
                name="image_url"
                onChange={(e) => setImageUpload(e.target.files[0])}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Tên Sản Phẩm</span>
              <input
                name="name"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                type="text"
                className="form-control"
                id="name"
                placeholder="Tên sản phẩm"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Giá thành</span>
              <input
                name="price"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
                type="number"
                className="form-control"
                id="name"
                placeholder="Số lượng"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Thương hiệu</span>
              <input
                name="origin"
                value={editingProduct.origin}
                onChange={(e) =>
                  setEditingProduct((prev) => ({
                    ...prev,
                    origin: e.target.value,
                  }))
                }
                type="text"
                className="form-control"
                id="name"
                placeholder="Thương hiệu"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Số lượng</span>
              <input
                name="quantity"
                value={editingProduct.quantity}
                onChange={(e) =>
                  setEditingProduct((prev) => ({
                    ...prev,
                    quantity: +e.target.value,
                  }))
                }
                type="text"
                className="form-control"
                id="name"
                placeholder="Số lượng"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Loại sản phẩm</span>
              <input
                name="category"
                value={editingProduct.category}
                onChange={(e) =>
                  setEditingProduct((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                type="text"
                className="form-control"
                id="name"
                placeholder="Loại sản phẩm"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Mô tả sản phẩm</span>
              <input
                name="description"
                value={editingProduct.description}
                onChange={(e) =>
                  setEditingProduct((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                type="text"
                className="form-control"
                id="name"
                placeholder="Mô tả sản phẩm"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Đóng
            </Button>
            <Button
              variant="primary"
              onClick={() => handleEditProduct(editingProduct)}
            >
              Lưu
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* ... */}
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
                  <a href="#" className="nav-link px-0">
                    <i className="fa-brands fa-app-store"></i>{" "}
                    <span className="d-none d-sm-inline text-info">
                      Quản Lý Cửa Hàng
                    </span>
                  </a>
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
          <div className="container ">
            {/* Phần xử lý người dùng */}
            <div className="row showList">
              <div id="listProduct" className="rounded col-12">
                <h3 style={{ color: "#936cec" }}>Thêm Sản Phẩm Vào Cửa Hàng</h3>{" "}
                <br />
                {/*Thêm ảnh*/}
                <input
                  type="file"
                  value={url}
                  onChange={(e) => {
                    setImageUpload(e.target.files[0]);
                  }}
                />
                <button onClick={uploadFile}> Upload Image</button>
                <img
                  src={imageUrls[imageUrls.length - 1]}
                  width={100}
                  height={100}
                  style={{ marginLeft: 20, marginBottom: 20 }}
                />
                {/* Thêm thông tin sản phẩm */}
                <div className="input-group mb-3 ">
                  <span className="input-group-text span-width">
                    Tên Sản Phẩm
                  </span>{" "}
                  <input
                    name="name"
                    onInput={(e) => handleInputChange(e)}
                    value={nameProduct}
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Tên sản phẩm"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text span-width">
                    Giá Sản Phẩm
                  </span>
                  <input
                    name="price"
                    value={priceProduct}
                    onInput={(e) => handleInputChange(e)}
                    type="number"
                    className="form-control"
                    id="price"
                    placeholder="Giá sản phẩm"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text span-width">
                    Thương Hiệu
                  </span>
                  <input
                    value={originProduct}
                    name="origin"
                    onInput={(e) => handleInputChange(e)}
                    type="text"
                    className="form-control"
                    id="trademark"
                    placeholder="Thương hiệu"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text span-width">
                    Số Lượng Tồn
                  </span>
                  <input
                    value={quantityProduct}
                    name="quantity"
                    type="number"
                    className="form-control"
                    id="trademark"
                    placeholder="Số lượng"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onInput={(e) => handleInputChange(e)}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text span-width">
                    Loại Sản Phẩm
                  </span>{" "}
                  <select
                    style={{ marginLeft: 20 }}
                    name="category"
                    onChange={(e) => handleInputChange(e)}
                  >
                    {categories.map((categorys, id) => (
                      <option value={categorys.title} key={id}>
                        {categorys.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text span-width">
                    Mô Tả Sản Phẩm
                  </span>
                  <textarea
                    type="text"
                    className="form-control"
                    id="trademark"
                    placeholder="Mô tả"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    name="description"
                    value={descriptionProduct}
                    onInput={(e) => handleInputChange(e)}
                  />
                </div>
                <button
                  style={{ marginBottom: 12 }}
                  onClick={(e) => handleSubmit(e)}
                  className="btn btn-primary menu_product-btn"
                >
                  Thêm
                </button>
                {/* Xử lý sản phẩm */}
                <table className="table table-striped table-bordered tableAdmin">
                  <thead>
                    <tr className="table-primary">
                      <th scope="col">STT</th>
                      <th scope="col">Ảnh</th>
                      <th scope="col">Tên Sản Phẩm</th>
                      <th scope="col">Thương Hiệu</th>
                      <th scope="col">Giá</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>

                    {products.map((product, index) => {
                      return (
                        <tr key={product.id}>
                          <td scope="row">{index + 1}</td>
                          <td scope="row">
                            <img src={product.image_url} width={100} />
                          </td>
                          <td scope="row">{product.name}</td>
                          <td scope="row">{product.origin}</td>
                          <td scope="row">{formatCurrency(product.price)}</td>
                          <td>
                            <button
                              className="btn btn-primery"
                              onClick={() => {
                                setEditingProduct(product);
                                setShowModal(true);
                              }}
                            >
                              <i className="fa-sharp fa-solid fa-pen" />
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-primery"
                              onClick={(id) => handleDeleteProduct(product.id)}
                            >
                              <i className="fa-solid fa-trash-can-arrow-up"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </thead>
                  <tbody id="draw-table"></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProduct;
