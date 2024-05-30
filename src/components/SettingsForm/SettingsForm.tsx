import { TextField, Button, Typography, Grid, Box } from "@mui/material";
import StyledForm from "../../styledComponents/StyledForm";
import { useFormik } from "formik";
import { ObjectSchema } from "yup";
import StyledLink from "../../styledComponents/StyledLink";
import UserProfile from "../UserProfile/UserProfile";
import { UserProfileProps } from "../../types";
import { FormValues } from "../schemas/baseValidationSchema"; // Ensure this path is correct

type SettingsFormProps = {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => void;
  formTitle: string;
  submitButtonText: string;
  userProfile?: UserProfileProps;
  bottomText?: string;
  bottomLinkText?: string;
  bottomLinkHref?: string;
  validationSchema: ObjectSchema<FormValues>;
  passwordFieldProps?: Partial<React.ComponentProps<typeof TextField>>;
  apiError?: string | null;
};

const SettingsForm = ({
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
  apiError,
}: SettingsFormProps) => {
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      onSubmit(values);
    },
    validationSchema: validationSchema,
  });

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <Grid item xs={12} container justifyContent={"space-between"}>
        <Typography component="h1" variant="h5">
          {formTitle}
        </Typography>
        {userProfile && (
          <UserProfile name={userProfile.name} avatar={userProfile.avatar} />
        )}
      </Grid>
      {apiError && (
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography color="error">{apiError}</Typography>
        </Box>
      )}
      <TextField
        id="firstName"
        name="firstName"
        label="Imię"
        type="text"
        autoComplete="on"
        variant="standard"
        value={formik.values.firstName || ""}
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
        value={formik.values.lastName || ""}
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
        value={formik.values.email || ""}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        fullWidth
      />
      <TextField
        id="oldPassword"
        name="oldPassword"
        label="Stare hasło"
        type="password"
        autoComplete="old-password"
        variant="standard"
        value={formik.values.oldPassword || ""}
        onChange={formik.handleChange}
        error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
        helperText={formik.touched.oldPassword && formik.errors.oldPassword}
        fullWidth
        {...passwordFieldProps}
      />
      <TextField
        id="newPassword"
        name="newPassword"
        label="Nowe hasło"
        type="password"
        autoComplete="new-password"
        variant="standard"
        value={formik.values.newPassword || ""}
        onChange={formik.handleChange}
        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
        helperText={formik.touched.newPassword && formik.errors.newPassword}
        fullWidth
        {...passwordFieldProps}
      />
      <TextField
        id="repeatPassword"
        name="repeatPassword"
        label="Powtórz hasło"
        type="password"
        autoComplete="repeat-password"
        variant="standard"
        value={formik.values.repeatPassword || ""}
        onChange={formik.handleChange}
        error={
          formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)
        }
        helperText={
          formik.touched.repeatPassword && formik.errors.repeatPassword
        }
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

export default SettingsForm;
