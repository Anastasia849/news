import * as yup from 'yup';

export interface RegistrationSchema {
    login: string;
    password: string;
    passwordAgain: string;
    fullName: string;
    files?: File[];
}

export const initialValues: RegistrationSchema = {
    login: '',
    password: '',
    passwordAgain: '',
    fullName: '',
}

export const validationSchema: yup.SchemaOf<RegistrationSchema> = yup.object({
    login: yup
        .string()
        .min(6, 'Минимальная длина логина 6 символов')
        .required('Логин обязателен'),
    password: yup
        .string()
        .min(6, 'Минимальная длина пароля 6 символов')
        .required('Пароль обязателен'),
    passwordAgain: yup
        .string()
        .min(6, 'Минимальная длина пароля 6 символов')
        .required('Повтирите пароль')
        .oneOf([yup.ref('password')], "Пароли должны совпадать"),
    fullName: yup
        .string()
        .min(3, 'Минимальная длина полного имени 3 символа')
        .required('Полное имя обязательно'),
    files: yup.array(),
});
