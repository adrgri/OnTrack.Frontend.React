import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import ForgotPasswordModal from "../../components/ForgotPasswordModal/ForgotPasswordModal";
import ResetPasswordModal from "../../components/ResetPasswordModal/ResetpasswordModal";
import Logo from "../../assets/logos/Logo.svg";
import { useAuth } from "../../contexts/AuthContext";
import { Box, useMediaQuery } from "@mui/material";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { resetPassword } = useAuth();
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleClickOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleResetPassword = async (email: string) => {
    try {
      await resetPassword(email);
      setIsModalOpen(false);
      setIsResetModalOpen(true);
    } catch (error) {
      console.error("Reset password failed:", error);
    }
  };

  const isSmallScreen = useMediaQuery("(max-width:400px)");

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        position: "relative",
      }}
    >
      <img
        src={Logo}
        alt="OnTrack Logo"
        style={{
          width: "240px",
          position: "absolute",
          top: isSmallScreen ? "25px" : "50px",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LoginForm onForgotPasswordClick={handleClickOpenModal} />
      </div>
      <ForgotPasswordModal
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        onResetSuccess={(email) => {
          console.log("Reset email sent to:", email);
          setIsResetModalOpen(true);
        }}
      />
      <ResetPasswordModal
        isOpen={isResetModalOpen}
        handleClose={() => setIsResetModalOpen(false)}
        onResetSuccess={handleResetPassword}
      />
    </Box>
  );
};

export default Login;
