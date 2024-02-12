import { useFormik } from "formik";
import * as yup from "yup";
import UserForm from "../UserForm/UserForm";
import { baseValidationSchema } from "../schemas/baseValidationSchema";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { RegistrationData, RegistrationResult } from "../../types";
import { useEffect } from "react";

type RegisterFormProps = {
  onSubmit: (registrationData: RegistrationData) => Promise<RegistrationResult>;
};

const registrationValidationSchema = baseValidationSchema.shape({
  firstName: (
    baseValidationSchema.fields.firstName as yup.StringSchema
  ).required("To pole jest wymagane"),
  lastName: (baseValidationSchema.fields.lastName as yup.StringSchema).required(
    "To pole jest wymagane"
  ),
  email: (baseValidationSchema.fields.email as yup.StringSchema).required(
    "To pole jest wymagane"
  ),
  password: (baseValidationSchema.fields.password as yup.StringSchema).required(
    "To pole jest wymagane"
  ),
});

const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const { register, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    firstName: yup.string().required("To pole jest wymagane"),
    lastName: yup.string().required("To pole jest wymagane"),
    email: yup
      .string()
      .email("Nieprawidłowy adres email")
      .required("To pole jest wymagane"),
    password: yup
      .string()
      .required("To pole jest wymagane")
      .min(8, "Min 8 znaków"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      register(values);

      formik.resetForm();
    },

    validationSchema: validationSchema,
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  });

  const handleRegistration = (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    register({
      firstName,
      lastName,
      email,
      password,
    });
  };

  return (
    <UserForm
      initialValues={formik.initialValues}
      onSubmit={handleRegistration}
      formTitle="Jesteś tu pierwszy raz?"
      submitButtonText="Załóż konto"
      bottomText="Masz już konto?"
      bottomLinkText="Zaloguj się"
      bottomLinkHref="/login"
      validationSchema={registrationValidationSchema}
    />
  );
};

export default RegisterForm;
