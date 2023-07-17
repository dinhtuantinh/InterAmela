import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();
  const [rememberPassword, setRememberPassword] = useState(false);

  useEffect(() => {
    const savedPassword = localStorage.getItem(`savedPassword_${email}`);
    if (savedPassword) {
      setPassword(savedPassword);
      setRememberPassword(true);
    }else {
      setPassword('');
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      if (rememberPassword) {
        localStorage.setItem(`savedPassword_${email}`, password);
      } else {
        localStorage.removeItem(`savedPassword_${email}`);
      }
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCheckboxChange = (event) => {
    setRememberPassword(event.target.checked);
  };

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Đăng nhập hệ thống</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              value={email}
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <label>
              <input
                type="checkbox"
                checked={rememberPassword}
                onChange={handleCheckboxChange}
              />
              Lưu mật khẩu
            </label>
            <hr></hr>
            <Button variant="primary" type="Submit">
              Đăng nhập
            </Button>
          </div>
        </Form>
        <hr />
        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
        <div className="p-1 box mt-3 text-center">
          Bạn chưa có tài khoản? <Link to="/signup">Đăng ký</Link>
          <br></br>
          Bạn quên mật khẩu? <Link to="/change-pass">Đặt lại mật khẩu</Link>
        </div>
      </div>
      
    </>
  );
};

export default Login;