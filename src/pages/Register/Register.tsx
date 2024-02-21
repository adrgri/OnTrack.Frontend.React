import RegisterForm from "../../components/RegisterForm/RegisterForm";
import Logo from "../../assets/logos/Logo.svg";

const Register = () => {
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
      <RegisterForm
      // onSubmit={(firstName, lastName, email, password) =>
      //   console.log(firstName, lastName, email, password)
      // }
      />
    </div>
  );
};

export default Register;
