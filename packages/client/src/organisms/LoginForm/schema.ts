import * as yup from 'yup';

export interface LoginSchema {
    login: string;
    password: string;
}

export const initialValues: LoginSchema = {
    login: '',
    password: '',
}

export const validationSchema: yup.SchemaOf<LoginSchema> = yup.object({
    login: yup
        .string()
        .min(6, 'Минимальная длина логина 6 символов')
        .required('Логин обязателен'),
    password: yup
        .string()
        .min(6, 'Минимальная длина пароля 6 символов')
        .required('Пароль обязателен'),
});
