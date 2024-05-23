import RegisterForm from "../../components/RegisterForm/RegisterForm";
import Logo from "../../assets/logos/Logo.svg";
import { Box, useMediaQuery } from "@mui/material";

const Register = () => {
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
        <RegisterForm
        // onSubmit={(firstName, lastName, email, password) =>
        //   console.log(firstName, lastName, email, password)
        // }
        />
      </div>
    </Box>
  );
};

export default Register;
