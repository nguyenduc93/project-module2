import React from "react";
import "./footer.css";

function Footer(props) {
  return (
    <div>
      <>
        {/* Footer */}
        <footer className="footer-distributed">
          <div className="footer-left">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/fir-project-filebase.appspot.com/o/Logo-White-500x500.png?alt=media&token=dae92abe-4445-4189-9df5-53831dc3bbae"
              alt=""
            />
            <p className="footer-links">
              <a href="#" className="link-1">
                Home
              </a>
              <a href="#">Blog</a>
              <a href="#">Pricing</a>
              <a href="#">About</a>
              <a href="#">Faq</a>
              <a href="#">Contact</a>
            </p>
            <p className="footer-company-name">Company Name © 2015</p>
          </div>
          <div className="footer-center">
            <div>
              <i className="fa fa-map-marker" />
              <p>
                <span>
                  <p>D35 KQH Ngô Quyền, Phường 6 Tp Đà Lạt,</p>
                </span>
                Làm việc kể cả Thứ 7 - Chủ Nhật
              </p>
            </div>
            <div>
              <i className="fa fa-phone" />
              <p>0975771793</p>
            </div>
            <div>
              <i className="fa fa-envelope" />
              <p>
                <a href="mailto:support@company.com">vanduc1212@gmail.com</a>
              </p>
            </div>
          </div>
          <div className="footer-right">
            <p className="footer-company-about">
              <span>
                <h5>Thông tin về công ty</h5>
              </span>
              Là đơn vị nhập khẩu trực tiếp, với phương châm đem đến cho khách
              hàng những sản phẩm đàn Piano điện cơ chính hãng, chất lượng, giá
              thành tốt nhất tới người sử dụng, chúng tôi luôn có rất nhiều sự
              lựa chọn cho khách hàng mong muốn sở hữu chiếc đàn Piano điện cơ
              chất lương giá rẻ.
            </p>
            <div className="footer-icons">
              <a href="#">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-instalod"></i>
              </a>
            </div>
          </div>
        </footer>
      </>
    </div>
  );
}

export default Footer;
