import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import ForgotPasswordModal from "../../components/ForgotPasswordModal/ForgotPasswordModal";
// import ResetPasswordModal from "../../components/ResetPasswordModal/ResetpasswordModal";
// import { useAuth } from "../../contexts/AuthContext";
import Logo from "../../assets/logos/Logo.svg";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { resetPassword } = useAuth();
  // const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleClickOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // // Inside Login component
  // const handleResetPassword = async (email) => {
  //   try {
  //     await resetPassword(email);
  //     // Assuming resetPassword is a promise that resolves when successful
  //     setIsModalOpen(false); // Close ForgotPasswordModal
  //     setIsResetModalOpen(true); // Open ResetPasswordModal
  //   } catch (error) {
  //     console.error("Reset password failed:", error);
  //     // Handle error, possibly staying on the same modal and showing an error message
  //   }
  // };

  return (
    <div
      style={{
        position: "relative",
        maxHeight: "100%",
        height: "100vh",
      }}
    >
      <img
        src={Logo}
        alt="OnTrack Logo"
        style={{
          position: "absolute",
          top: "50px",
          width: "240px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <LoginForm
        // onSubmit={(email, password) => console.log(email, password)}
        onForgotPasswordClick={handleClickOpenModal}
      />
      <ForgotPasswordModal
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        onResetSuccess={(email) => {
          console.log("Reset email sent to:", email);
          // setIsResetModalOpen(true);
        }}
      />
    </div>
  );
};

export default Login;
