import { useFormik } from "formik";
import * as yup from "yup";
import UserForm from "../UserForm/UserForm";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
    .min(8, "Min 8 znaków"),
});

const RegisterForm = () => {
  const { register, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await register(values);

      if (result.success) {
        formik.resetForm();
        navigate("/home");
      } else {
        console.error(result.message);
      }
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  // Custom onSubmit handler
  const handleRegistration = (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    formik.setValues({ firstName, lastName, email, password });
    formik.handleSubmit();
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
      validationSchema={validationSchema}
    />
  );
};

export default RegisterForm;
