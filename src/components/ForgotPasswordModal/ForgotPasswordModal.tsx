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

type ForgotPasswordModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  onResetSuccess: (email: string) => void;
};

const validationSchema = yup.object({
  forgotPasswordEmail: yup
    .string()
    .email("Nieprawidłowy adres email")
    .required("Email jest wymagany"),
});

const ForgotPasswordModal: FC<ForgotPasswordModalProps> = ({
  isOpen,
  handleClose,
  onResetSuccess,
}) => {
  const { resetPassword } = useAuth();

  const formik = useFormik({
    initialValues: {
      forgotPasswordEmail: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true); // Set the submitting state to true

      try {
        // Call the forgotPassword function with the email value
        await resetPassword(values.forgotPasswordEmail);
        console.log(values.forgotPasswordEmail);
        // Handle success, such as showing a success message or closing the modal
        console.log("Password reset email sent to", values.forgotPasswordEmail);
        handleClose();
        onResetSuccess(values.forgotPasswordEmail);
      } catch (error) {
        console.error("Failed to send password reset email", error);
        // Here you can handle errors, such as displaying an error message to the user
      } finally {
        setSubmitting(false); // Reset the submitting state
      }
    },
  });

  return (
    <div>
      <StyledDialog fullWidth maxWidth="sm" open={isOpen} onClose={handleClose}>
        <DialogTitle sx={{ m: 0, p: 2, fontSize: "1.2rem" }}>
          Zapomniałem hasła
          <CloseButton onClick={handleClose} />
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="forgotPasswordEmail"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              value={formik.values.forgotPasswordEmail}
              onChange={formik.handleChange}
              error={
                formik.touched.forgotPasswordEmail &&
                Boolean(formik.errors.forgotPasswordEmail)
              }
              helperText={
                formik.touched.forgotPasswordEmail &&
                formik.errors.forgotPasswordEmail
              }
            />
          </DialogContent>

          <DialogActions>
            <Button
              variant="contained"
              sx={{ textAlign: "center" }}
              type="submit"
              fullWidth
            >
              Wyślij
            </Button>
          </DialogActions>
        </form>
      </StyledDialog>
    </div>
  );
};

export default ForgotPasswordModal;
