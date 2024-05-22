import SettingsForm from "../SettingsForm/SettingsForm";
import { baseValidationSchema } from "../schemas/baseValidationSchema";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const MySettings = () => {
  const { user, isLoggedIn, token } = useAuth();
  console.log("user in MySettings", user);

  if (!isLoggedIn) {
    return <div>Please log in to edit your settings.</div>;
  }

  // Handling update settings which will interact with an API
  const handleUpdateSettings = async (firstName: string, lastName: string) => {
    try {
      const response = await axios.put(
        `${apiUrl}/user/me`,
        { firstName, lastName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User settings updated:", response.data);
      // Optionally, update user in context if needed
    } catch (error) {
      console.error(
        "Failed to update user settings:",
        error.response?.data || error.message
      );
    }
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
