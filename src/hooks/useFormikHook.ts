import { useFormik } from "formik";

type FormikHookProps = {
  initialValues: any;
  validationSchema: any;
  onSubmit: (email: string, password: string) => void;
};

export const useFormikHook = ({
  initialValues,
  validationSchema,
  onSubmit,
}) => {
  return useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error("Submission failed", error);
      } finally {
        setSubmitting(false);
      }
    },
  });
};
