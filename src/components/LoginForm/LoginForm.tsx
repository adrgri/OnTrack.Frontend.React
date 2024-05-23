import { TextField, Button, Link, Typography } from "@mui/material";
import StyledForm from "../../styledComponents/StyledForm";
import { useFormik } from "formik";
import * as yup from "yup";
import StyledLink from "../../styledComponents/StyledLink";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type LoginFormProps = {
  onForgotPasswordClick?: () => void;
};

const LoginForm = ({ onForgotPasswordClick }: LoginFormProps) => {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("To pole jest wymagane")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u,
        "Nieprawidłowy adres email"
      ),
    password: yup
      .string()
      .required("To pole jest wymagane")
      .min(8, "Min 8 znaków"),
  });

  const formik = useFormik({
    initialValues: {
      email: "coolcoder2000@gmail.com",
      password: "Otheridk1.",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await login(values);
        navigate("/");
      } catch (error) {
        console.error("Login failed:", error);
      } finally {
        setLoading(false);
        formik.resetForm();
      }
    },
    validationSchema: validationSchema,
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  });

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <Typography variant="h5" align="center">
        Jesteś już użytkownikiem?
      </Typography>
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
        sx={{ mt: 3 }}
      />
      <TextField
        id="password"
        name="password"
        label="Hasło"
        type="password"
        autoComplete="on"
        variant="standard"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        fullWidth
        sx={{ mb: 3 }}
      />
      {onForgotPasswordClick && (
        <Typography alignSelf={"flex-end"}>
          <Link href="#" onClick={onForgotPasswordClick}>
            Nie pamiętam hasła
          </Link>
        </Typography>
      )}
      <Button variant="contained" fullWidth type="submit" disabled={loading}>
        {loading ? "Logowanie..." : "Zaloguj się"}
      </Button>
      <Typography fontSize={"1rem"}>
        Nie masz konta? <StyledLink to={"/register"}>Załóż konto</StyledLink>
      </Typography>
    </StyledForm>
  );
};

export default LoginForm;
