import React, { useState, useEffect } from "react";
import "./register.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Register(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsValidEmail(validateEmail(email));
    setIsValidName(validateName(name));
    setIsValidPassword(validatePassword(password));
    setIsValidConfirmPassword(
      validateConfirmPassword(confirmPassword, password)
    );
  }, [email, name, password, confirmPassword]);
  const loadUser = async () => {
    const result = await axios.get(
      `http://localhost:8000/users?email=${email}`
    );
    if (result.data.length > 0) {
      alert("Email đã được đăng ký");
    }
  };
  useEffect(() => {
    loadUser();
  });
  const validateEmail = (value) => {
    if (!value) {
      return true;
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    return emailRegex.test(value);
  };
  const validateName = (value) => {
    if (!value) {
      return true;
    }
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    return nameRegex.test(value);
  };

  const validatePassword = (value) => {
    if (!value) {
      return true;
    }
    return value.length >= 8;
  };

  const validateConfirmPassword = (value, passwordValue) => {
    if (!value) {
      return true;
    }
    return value === passwordValue;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isNameValid = validateName(name);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(
      confirmPassword,
      password
    );
    setIsValidEmail(isEmailValid);
    setIsValidName(isNameValid);
    setIsValidPassword(isPasswordValid);
    setIsValidConfirmPassword(isConfirmPasswordValid);

    if (
      isEmailValid &&
      isNameValid &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
      await axios
        .post("http://localhost:8000/users", {
          email: email,
          name: name,
          password: password,
          permission: "user",
          status: 1,
        })
        .then((response) => {
          if (response.status === 201) {
            alert("Đăng ký thành công");
            navigate("/login");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="containerr">
      <form className="form-login-container" onSubmit={handleSubmit}>
        <div className="form-register">
          <h3 className="form-heading">Đăng Ký</h3>
          <hr />
          <div className="register-group">
            <lable className="form-lable">Email</lable>
            <input
              placeholder="Nhập địa chỉ email"
              type="text"
              className={`form-input ${isValidEmail ? "" : "invalid"}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isValidEmail && (
              <span className="error-message">* Email không hợp lệ!</span>
            )}
          </div>
          <div className="register-group">
            <lable className="form-lable">Tên người dùng</lable>
            <input
              placeholder="Nhập số điện thoại"
              type="text"
              className={`form-input ${isValidName ? "" : "invalid"}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {!isValidName && (
              <span className="error-message">
                * Tên người dùng không hợp lệ!
              </span>
            )}
          </div>
          <div className="register-group">
            <lable className="form-lable">Mật khẩu</lable>
            <input
              placeholder="Nhập mật khẩu"
              type="password"
              className={`form-input ${isValidPassword ? "" : "invalid"}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isValidPassword && (
              <span className="error-message">
                * Mật khẩu cần ít nhất 8 ký tự!
              </span>
            )}
          </div>
          <div className="register-group">
            <lable className="form-lable">Nhập lại mật khẩu</lable>
            <input
              placeholder="Nhập lại mật khẩu"
              type="password"
              className={`form-input ${
                isValidConfirmPassword ? "" : "invalid"
              }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!isValidConfirmPassword && (
              <span className="error-message">* Mật khẩu không khớp!</span>
            )}
          </div>
          <div className="register-button">
            <button className="btn btn-primary btn-200" type="submit">
              Đăng ký
            </button>
          </div>
          <div className="register-link">
            <NavLink to="/">Trang chủ</NavLink>
            <p className="text-footer">
              Bạn đã có tài khoản? <NavLink to="/login">Đăng Nhập</NavLink>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
