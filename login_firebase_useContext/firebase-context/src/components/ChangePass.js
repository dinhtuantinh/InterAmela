import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";

const ChangePass = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { sendPasswordReset } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await sendPasswordReset(email);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Điền địa chỉ email để thay đổi mật khẩu</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
            Xác nhận email
            </Button>
          </div>
        </Form>
        <div className="p-1 box mt-3 text-center">
            Quay lại? <Link to="/">Click</Link>
        </div>
      </div>
      
    </>
  );
};

export default ChangePass;