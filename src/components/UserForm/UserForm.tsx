import { TextField, Button, Typography } from "@mui/material";
import StyledForm from "../../styledComponents/StyledForm";
import { useFormik } from "formik";
import { ObjectSchema } from "yup";
import StyledLink from "../../styledComponents/StyledLink";
import UserProfile from "../UserProfile/UserProfile";
import { UserProfileProps } from "../../types";
import { FormValues } from "../schemas/baseValidationSchema";

type UserFormProps = {
  initialValues: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  onSubmit: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void;
  formTitle: string;
  submitButtonText: string;
  userProfile?: UserProfileProps;
  bottomText?: string;
  bottomLinkText?: string;
  bottomLinkHref?: string;
  validationSchema: ObjectSchema<FormValues>;
  passwordFieldProps?: Partial<React.ComponentProps<typeof TextField>>;
};

const UserForm = ({
  initialValues,
  onSubmit,
  formTitle,
  submitButtonText,
  userProfile,
  bottomText,
  bottomLinkText,
  bottomLinkHref = "/",
  validationSchema,
  passwordFieldProps,
}: UserFormProps) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(
        values.firstName,
        values.lastName,
        values.email,
        values.password
      );
    },
  });

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <Typography component="h1" variant="h5">
        {formTitle}
      </Typography>
      {userProfile && (
        <UserProfile name={userProfile.name} avatar={userProfile.avatar} />
      )}
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
        {...passwordFieldProps}
      />
      <Button variant="contained" fullWidth type="submit">
        {submitButtonText}
      </Button>
      <Typography fontSize={"1rem"}>
        {bottomText}{" "}
        <StyledLink to={bottomLinkHref}>{bottomLinkText}</StyledLink>
      </Typography>
    </StyledForm>
  );
};

export default UserForm;
