import RegisterForm from "../../components/RegisterForm/RegisterForm";
import OnTrackLogo from "../../assets/logos/OnTrackLogo.png";

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
        src={OnTrackLogo}
        alt="OnTrack Logo"
        style={{
          position: "absolute",
          top: "50px",
          maxWidth: "200px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <RegisterForm
        onSubmit={(firstName, lastName, email, password) =>
          console.log(firstName, lastName, email, password)
        }
      />
    </div>
  );
};

export default Register;
