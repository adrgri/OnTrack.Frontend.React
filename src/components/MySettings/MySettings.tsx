import { useState } from "react";
import SettingsForm from "../SettingsForm/SettingsForm";
import {
  baseValidationSchema,
  FormValues,
} from "../schemas/baseValidationSchema";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../api/api";

const apiUrl = import.meta.env.VITE_API_URL;

interface CustomError extends Error {
  response?: {
    status?: number;
  };
}

const MySettings = () => {
  const { user, isLoggedIn, token } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);

  console.log("user in MySettings", user);

  if (!isLoggedIn) {
    return <div>Please log in to edit your settings.</div>;
  }

  // Handling update settings for name
  const handleUpdateName = async (firstName?: string, lastName?: string) => {
    try {
      const response = await api.put(
        `${apiUrl}/user/me`,
        { firstName, lastName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User name updated:", response.data);
      // Optionally, update user in context if needed
    } catch (error) {
      let errorMessage = "Failed to update user name: ";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error(errorMessage);
    }
  };

  // Handling update settings for email and password
  const handleUpdateEmailAndPassword = async (values: FormValues) => {
    try {
      setApiError(null); // Reset API error state before making the request
      const payload: {
        newEmail?: string;
        newPassword?: string;
        oldPassword?: string;
      } = {};

      if (values.email && values.email !== user?.email) {
        payload.newEmail = values.email;
      }
      if (values.newPassword && values.oldPassword) {
        payload.newPassword = values.newPassword;
        payload.oldPassword = values.oldPassword;
      }

      if (Object.keys(payload).length === 0) {
        return; // No changes to be made
      }

      const response = await api.post(
        `${apiUrl}/identity/manage/info`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User email and/or password updated:", response.data);
      // Optionally, update user in context if needed
    } catch (error) {
      let errorMessage = "Nie udało się zaktualizować hasła: ";

      if (error instanceof Error) {
        const customError = error as CustomError;
        if (customError.response && customError.response.status === 400) {
          errorMessage = "Stare hasło jest nieprawidłowe.";
        } else {
          errorMessage = customError.message;
        }
      } else {
        errorMessage = "An unknown error occurred.";
      }
      setApiError(errorMessage);
      console.error(errorMessage);
    }
  };

  const handleUpdateSettings = (values: FormValues) => {
    // Check if the name has changed
    if (
      values.firstName !== user?.firstName ||
      values.lastName !== user?.lastName
    ) {
      handleUpdateName(values.firstName, values.lastName);
    }

    // Check if the email or password fields have been filled out
    if (
      values.email !== user?.email ||
      (values.oldPassword && values.newPassword)
    ) {
      handleUpdateEmailAndPassword(values);
    }
  };

  return (
    <SettingsForm
      initialValues={{
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        email: user?.email ?? "",
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",
      }}
      onSubmit={handleUpdateSettings}
      formTitle="Moje ustawienia"
      submitButtonText="Zapisz zmiany"
      userProfile={{
        name: `${user?.firstName} ${user?.lastName}`,
        avatar: user?.avatar ?? "",
      }}
      validationSchema={baseValidationSchema}
      apiError={apiError}
      passwordFieldProps={{
        InputLabelProps: {
          shrink: true,
        },
      }}
    />
  );
};

export default MySettings;
