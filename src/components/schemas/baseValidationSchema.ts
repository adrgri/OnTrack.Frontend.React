import * as yup from "yup";
import { ObjectSchema } from "yup";

export type FormValues = {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  password: string | undefined;
};

export const baseValidationSchema: ObjectSchema<FormValues> = yup
  .object()
  .shape({
    firstName: yup.string().min(2, "Za krótkie imię"),
    lastName: yup.string().min(2, "Za krótkie nazwisko"),
    email: yup.string().email("Nieprawidłowy adres email"),
    password: yup.string().min(8, "Min 8 znaków"),
  });
