import React from "react";

function Slide(props) {
  return (
    <div className="corousel">
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              height={550}
              src="https://firebasestorage.googleapis.com/v0/b/fir-project-filebase.appspot.com/o/guitar-station-inside.jpg?alt=media&token=0e7864a7-99e0-493c-9f1b-41579f6a391f"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h2>ĐÀN GUITAR TRỰC TUYẾN, UY TÍN, TIỆN LỢI</h2>
              <button className="slide"> HƯỚNG DẪN CHỌN ĐÀN GUITAR</button>
              <button className="slide"> MUA ĐÀN GUITAR</button>
            </div>
          </div>
          <div className="carousel-item">
            <img
              height={550}
              src="https://firebasestorage.googleapis.com/v0/b/fir-project-filebase.appspot.com/o/tai-ngay-199-hinh-anh-dan-guitar-dep-nhat-lang-man-day-tam-trang-5.jpg?alt=media&token=4e630db3-3aa2-4e8f-968f-894b27e315cf"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h2>KHÁCH HÀNG LÀ THƯỢNG ĐẾ !</h2>
              <h4>Đa Dạng Về Thể Loại</h4>
            </div>
          </div>
          <div className="carousel-item">
            <img
              height={550}
              src="https://firebasestorage.googleapis.com/v0/b/fir-project-filebase.appspot.com/o/IMG_6115-scaled.jpg?alt=media&token=3fd0dacd-3b48-46d7-bdaa-7c62918a1e54"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h2>ĐÀN KALIMBA XINH XẮN, GIÁ RẺ VÀ CỰC KỲ DỄ CHƠI</h2>
              <h3>Giá chỉ từ 390,000đ</h3>
              <button className="slide">Mua Ngay</button>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Slide;
