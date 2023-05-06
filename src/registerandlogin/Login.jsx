import React from "react";
import "./register.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
function Login(props) {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const result = await axios.get("http://localhost:8000/users");
    setUsers(result.data);
  };
  const handleLogin = () => {
    if (email === "" || password === "") {
      alert("Vui lòng nhập đầy đủ thông tin đăng nhập!");
      return;
    }

    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      alert("Email hoặc mật khẩu không đúng!");
      return;
    }

    if (user.status === 0) {
      alert("Tài khoản đã bị khóa!");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    if (user.permission === "admin" && user.status === 1) {
      // Kiểm tra quyền quản trị và trạng thái tài khoản
      navigate("/");
    } else if (user.status === 1) {
      // Chỉ cho phép đăng nhập nếu tài khoản chưa bị khóa
      navigate("/");
    }
  };

  return (
    <div className="containerr">
      <div className="form-login-container">
        <div className="form-register">
          <h3 className="form-heading">Đăng Nhập</h3>
          <hr />
          <div className="register-group">
            <lable className="form-lable">Email</lable>
            <input
              placeholder="Nhập địa chỉ email"
              type="text"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="register-group">
            <lable className="form-lable">Mật khẩu</lable>
            <input
              placeholder="Nhập mật khẩu"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="register-button">
            <button onClick={handleLogin} className="btn btn-primary btn-200">
              Đăng nhập
            </button>
          </div>
          <div className="register-link">
            <NavLink to="/">Trang chủ</NavLink>
            <p className="text-footer">
              Bạn chưa có tài khoản? <NavLink to="/register">Đăng Ký</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
