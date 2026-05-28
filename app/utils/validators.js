import * as yup from 'yup';

export const loginSchema = yup.object({
  username: yup.string().trim().required('Username is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});

export const registerSchema = yup.object({
  username: yup.string().trim().required('Username is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password')
});

export const amountSchema = yup
  .number()
  .typeError('Amount must be a number')
  .positive('Amount must be greater than zero')
  .required('Amount is required');

export const itemSchema = yup.object({
  title: yup.string().trim().required('Title is required'),
  amount: amountSchema,
  description: yup
    .string()
    .trim()
    .min(3, 'Description must be at least 3 characters')
    .required('Description is required')
});
