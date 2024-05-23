import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StyledForm from "../../styledComponents/StyledForm";
import StyledLink from "../../styledComponents/StyledLink";
import { Button, TextField, Typography } from "@mui/material";

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
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      console.log("Submitting values:", values); // Debugging line

      try {
        const result = await register(values);
        if (result.success) {
          formik.resetForm();
          navigate("/");
        } else {
          console.error("Registration failed:", result.message);
        }
      } catch (error) {
        let errorMessage = "An error occurred while registering: ";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        console.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <Typography component="h1" variant="h5">
        Jesteś tu pierwszy raz?
      </Typography>
      <TextField
        id="firstName"
        name="firstName"
        label="Imię"
        type="text"
        autoComplete="on"
        variant="standard"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
        fullWidth
      />
      <TextField
        id="lastName"
        name="lastName"
        label="Nazwisko"
        type="text"
        autoComplete="on"
        variant="standard"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
        fullWidth
      />
      <TextField
        id="email"
        name="email"
        label="Email"
        type="email"
        autoComplete="on"
        variant="standard"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        fullWidth
      />
      <TextField
        id="password"
        name="password"
        label="Hasło"
        type="password"
        autoComplete="new-password"
        variant="standard"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        fullWidth
      />
      <Button variant="contained" fullWidth type="submit" disabled={loading}>
        {loading ? "Rejestracja..." : "Załóż konto"}
      </Button>
      <Typography fontSize={"1rem"}>
        Masz już konto? <StyledLink to={"/login"}>Zaloguj się</StyledLink>
      </Typography>
    </StyledForm>
  );
};

export default RegisterForm;
