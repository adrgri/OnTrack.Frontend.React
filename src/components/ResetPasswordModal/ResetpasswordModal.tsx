import { FC } from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import StyledDialog from "../../styledComponents/StyledDialog";
import CloseButton from "../CloseButton/CloseButton";
import { useAuth } from "../../contexts/AuthContext";

type ResetPasswordModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Nieprawidłowy adres email")
    .required("Email jest wymagany"),
  resetCode: yup.string().required("Kod resetujący jest wymagany"),
  newPassword: yup
    .string()
    .min(8, "Hasło musi zawierać co najmniej 8 znaków")
    .required("Nowe hasło jest wymagane"),
});

const ResetPasswordModal: FC<ResetPasswordModalProps> = ({
  isOpen,
  handleClose,
}) => {
  const { changePassword } = useAuth(); // Assuming there's a changePassword function in useAuth context

  const formik = useFormik({
    initialValues: {
      email: "",
      resetCode: "",
      newPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        await changePassword(
          values.email,
          values.resetCode
          // values.newPassword
        );
        console.log("Password has been reset successfully");
        handleClose();
      } catch (error) {
        console.error("Failed to reset password", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <StyledDialog fullWidth maxWidth="sm" open={isOpen} onClose={handleClose}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Resetowanie hasła
        <CloseButton onClick={handleClose} />
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="dense"
            id="resetCode"
            label="Kod resetujący"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            error={formik.touched.resetCode && Boolean(formik.errors.resetCode)}
            helperText={formik.touched.resetCode && formik.errors.resetCode}
          />
          <TextField
            margin="dense"
            id="newPassword"
            label="Nowe hasło"
            type="password"
            fullWidth
            variant="standard"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
        </DialogContent>

        <DialogActions>
          <Button variant="contained" type="submit" fullWidth>
            Zresetuj hasło
          </Button>
        </DialogActions>
      </form>
    </StyledDialog>
  );
};

export default ResetPasswordModal;
