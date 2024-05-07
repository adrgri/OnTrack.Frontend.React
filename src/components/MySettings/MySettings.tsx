import SettingsForm from "../SettingsForm/SettingsForm";
import { baseValidationSchema } from "../schemas/baseValidationSchema";

const MySettings = () => {
  const user = {
    firstName: "Iryna",
    lastName: "Chuchvaha",
    email: "chuchvahairyna@gmail.com",
    // avatar: "/src/assets/Images/portrait.jpeg",
    avatar: "https://i.pravatar.cc/150?img=51",
  };

  const handleUpdateSettings = (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
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
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",
      }}
      onSubmit={handleUpdateSettings}
      formTitle="Moje ustawienia"
      submitButtonText="Zapisz zmiany"
      userProfile={{
        avatar: user.avatar,
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
