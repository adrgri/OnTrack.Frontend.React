import SettingsForm from "../SettingsForm/SettingsForm";
import { baseValidationSchema } from "../schemas/baseValidationSchema";
import { useAuth } from "../../contexts/AuthContext";

const MySettings = () => {
  // const user = {
  //   firstName: "Iryna",
  //   lastName: "Chuchvaha",
  //   email: "chuchvahairyna@gmail.com",
  //   // avatar: "/src/assets/Images/portrait.jpeg",
  //   avatar: "https://i.pravatar.cc/150?img=51",
  // };
  // Using the useAuth hook to access user and isLoggedIn
  const { user, isLoggedIn } = useAuth();
  console.log("user in MySettings", user);
  console.log("isLoggedIn in MySettings", isLoggedIn);

  // If the user is not logged in, display a login prompt
  if (!isLoggedIn) {
    return <div>Please log in to edit your settings.</div>;
  }

  console.log("user in MySettings", user);

  // Handling update settings which will likely interact with an API
  const handleUpdateSettings = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    // Placeholder for actual update logic
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("User settings updated:", {
          firstName,
          lastName,
          email,
          password,
        });
        resolve("Settings updated successfully.");
      }, 1000);
    });
  };

  return (
    <SettingsForm
      initialValues={{
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",
      }}
      onSubmit={handleUpdateSettings}
      formTitle="Moje ustawienia"
      submitButtonText="Zapisz zmiany"
      userProfile={{
        avatar: user?.avatar || "https://i.pravatar.cc/150?img=51",
      }}
      validationSchema={baseValidationSchema}
      passwordFieldProps={{
        InputLabelProps: {
          shrink: true,
        },
      }}
    />
  );
};

export default MySettings;
