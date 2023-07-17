import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";

const Home = () => {
  const { logOut, user, applyCode } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleConfirmPassword = () => {
    navigate("/change-pass");
  }
  return (
    <>
      <div className="p-4 box mt-3 text-center">
        Xin chào<br />
        {user && user.email}
      </div>
      <div className="d-grid gap-2">
      <Button variant="primary" className="col-6" onClick={handleConfirmPassword}>
          Đổi mật khẩu
        </Button>
        <Button variant="danger" className="col-6" onClick={handleLogout}>
          Đăng xuất
        </Button>
      </div>
    </>
  );
};

export default Home;