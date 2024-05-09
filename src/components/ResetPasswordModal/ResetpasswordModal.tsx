import { FC, useEffect } from "react";
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
  onResetSuccess: (email: string) => void;
};

const validationSchema = yup.object({
  resetCode: yup.string().required("Kod resetujący jest wymagany"),
  newPassword: yup
    .string()
    .min(8, "Hasło musi zawierać co najmniej 8 znaków")
    .required("Nowe hasło jest wymagane"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Hasła nie pasują")
    .required("Powtożenie hasła jest wymagane"),
});

const ResetPasswordModal: FC<ResetPasswordModalProps> = ({
  isOpen,
  handleClose,
  onResetSuccess,
}) => {
  const { changePassword } = useAuth();

  const formik = useFormik({
    initialValues: {
      resetCode: "",
      newPassword: "",
      repeatPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        await changePassword(
          values.resetCode,
          values.newPassword,
          values.repeatPassword
        );
        console.log("Password has been reset successfully");
        handleClose();
        onResetSuccess(values.resetCode);
      } catch (error) {
        console.error("Failed to reset password", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Effect to auto-fill reset code from clipboard when modal opens
  useEffect(() => {
    if (isOpen) {
      navigator.clipboard
        .readText()
        .then((text) => {
          // Only update if the clipboard text could be a reset code
          if (text && text.length === 6) {
            // Assuming reset codes are 6 characters long
            formik.setFieldValue("resetCode", text);
          }
        })
        .catch((err) =>
          console.error("Failed to read clipboard contents", err)
        );
    }
  }, [isOpen, formik]);

  return (
    <StyledDialog fullWidth maxWidth="sm" open={isOpen} onClose={handleClose}>
      <DialogTitle sx={{ m: 0, p: 2, fontSize: "1.2rem" }}>
        Resetowanie hasła
        <CloseButton onClick={handleClose} />
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
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
          <TextField
            margin="dense"
            id="repeatPassword"
            label="Powtórz hasło"
            type="password"
            fullWidth
            variant="standard"
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.repeatPassword &&
              Boolean(formik.errors.repeatPassword)
            }
            helperText={
              formik.touched.repeatPassword && formik.errors.repeatPassword
            }
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
