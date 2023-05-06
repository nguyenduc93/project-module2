import React, { useEffect, useState } from "react";
import "./Page.css";
import Navbarr from "../navbar/Navbarr";
import Footer from "../footer/Footer";
import axios from "axios";
import { Rate } from "antd";
import { useParams } from "react-router-dom";

function Detail(props) {
  const [commentData, setCommentData] = useState({
    commentText: "",
    ratingValue: 0,
  });
  const [productDetails, setProductDetails] = useState({});
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const getComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/products/${id}/comments`
      );
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/products/${id}`
        );
        setProductDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProductDetails();
    getComments(); // Lấy danh sách bình luận của sản phẩm
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCommentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddComment = async () => {
    try {
      const { commentText, ratingValue } = commentData;

      const response = await axios.post(
        `http://localhost:8000/products/${id}/comments`,
        {
          user: currentUser.name,
          comment: commentText,
          rating: ratingValue,
        }
      );
      const newComment = response.data;

      setComments([...comments, newComment]); // Cập nhật lại danh sách bình luận

      setCommentData({
        commentText: "",
        ratingValue: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbarr />
      <>
        <main role="main">
          <div className="container mt-4">
            <div
              id="thongbao"
              className="alert alert-danger d-none face"
              role="alert"
            >
              {/* <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button> */}
            </div>
            <div className="card">
              <div className="container-fliud">
                <div className="wrapper row">
                  <div className="preview col-md-6">
                    <ul className="preview-thumbnail nav nav-tabs">
                      <li className="active">
                        <a data-target="#pic-1" data-toggle="tab" className="">
                          <img
                            width={450}
                            height={500}
                            src={productDetails.image_url}
                            alt=""
                          />
                        </a>
                      </li>
                      <li className="">
                        <a data-target="#pic-2" data-toggle="tab" className="">
                          <img
                            width={200}
                            height={200}
                            src={productDetails.image_url1}
                            alt=""
                          />
                        </a>
                      </li>
                      <li className="">
                        <a
                          data-target="#pic-3"
                          data-toggle="tab"
                          className="active"
                        >
                          <img
                            width={200}
                            height={200}
                            src={productDetails.image_url2}
                            alt=""
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="details col-md-6">
                    <h3 className="product-title">{productDetails.name}</h3>
                    <h4 className="price">
                      Giá hiện tại:{" "}
                      <span style={{ color: "red" }}>
                        {productDetails.price}
                      </span>
                    </h4>
                    <div className="product-description">
                      <h4>Thể Loại: {productDetails.category}</h4>
                    </div>
                    <div className="product-description">
                      <h4>
                        Xuất Xứ:{" "}
                        <span style={{ color: "black" }}>
                          {productDetails.origin}
                        </span>
                      </h4>
                    </div>
                    <div className="action">
                      <button
                        className="btn btn-primary"
                        type="button"
                        // onClick={() => handleAddToCart(productDetails)}
                      >
                        Mua ngay
                      </button>
                    </div>{" "}
                    <br />
                    <div className="product-description">
                      <div>
                        <h3>Mô tả sản phẩm </h3>
                        {productDetails.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3>Bình luận và đánh giá sản phẩm</h3>
              <p>Điểm đánh giá trung bình:</p>
              <hr />
              <div className="comments-list">
                <div className="form-group">
                  <label htmlFor="commentText">Bình luận:</label>
                  <textarea
                    name="commentText"
                    id="commentText"
                    cols="30"
                    rows="3"
                    className="form-control"
                    value={commentData.commentText}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="ratingValue">Rating:</label>
                  <Rate
                    className="form-control yellow-stars"
                    value={commentData.ratingValue}
                    onChange={(value) =>
                      setCommentData({ ...commentData, ratingValue: value })
                    }
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddComment}
                >
                  Thêm bình luận
                </button>
                {comments.map((comment, index) => (
                  <div key={index} className="media mt-4">
                    <div className="media-body">
                      <p className="mt-0">{comment.user}</p>
                      <Rate value={comment.rating} />
                      <p>{comment.comment} </p>
                      <hr></hr>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    </div>
  );
}

export default Detail;
