import React from "react";
import Navbarr from "../navbar/Navbarr";
import Footer from "../footer/Footer";
function Learning(props) {
  return (
    <div>
      <Navbarr />
      <div className="containerImg">
        <div className="containerImage5">
          <div className="card bg-dark text-white containerImg1">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/fir-project-filebase.appspot.com/o/tuhoc.jpg?alt=media&token=89d79e38-a00d-48e1-9d02-7f8ce8eb1a81"
              className="card-img"
              alt="..."
            />
            <div className="card-img-overlay ">
              <h5 className="card-title">HỌC ĐÀN GUITAR CƠ BẢN</h5>
              <p className="card-text">
                Mãi sau này anh mới biết <br /> Bông hoa đó không phải của anh{" "}
                <br /> Chẳng qua là anh đã đi ngang qua!
              </p>
            </div>
          </div>
          <div className="containerImg6">
            <div>
              <div className="card bg-dark text-white containerImg2">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/fir-project-filebase.appspot.com/o/tuhoc1.jpeg?alt=media&token=8ff95f7d-f78d-498f-b610-9a880a8094b9"
                  className="card-img"
                  alt="..."
                />
                <div className="card-img-overlay">
                  <h5 className="card-title">HỌC ĐÀN GUITAR NÂNG CAO</h5>
                  <p className="card-text">
                    Lý do chia tay là gì em có biết không <br />
                    Vì em không yêu anh như anh yêu em <br /> Vì em xem anh chỉ
                    là nhất thời!
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="card bg-dark text-white containerImg3">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/fir-project-filebase.appspot.com/o/tuhoc2.jpeg?alt=media&token=5bea8058-2b94-40d2-9219-76613764fc7b"
                  className="card-img"
                  alt="..."
                />
                <div className="card-img-overlay">
                  <h5 className="card-title">HỢP ÂM GUITAR</h5>
                  <p className="card-text">
                    Người mới chơi vơi như anh <br /> Làm sao anh mơ có em{" "}
                    <br /> Mãi sau này xa nhau anh mới thấu
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card bg-dark text-white containerImg4">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/fir-project-filebase.appspot.com/o/tuhoc4.jpeg?alt=media&token=2179de4d-c851-4c29-8b2c-a43c08d0675e"
              className="card-img"
              alt="..."
            />
            <div className="card-img-overlay">
              <h5 className="card-title">
                Hướng Dẫn Mua Đàn Guitar Cho Người Mới Tập Chơi
              </h5>
              <p className="card-text">
                Suốt chặng đường khi yêu ai biết đâu <br /> Người mình từng
                thương <br /> Giờ như hai người xa lạ <br />
                Đã biết hết về nhau
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Learning;
