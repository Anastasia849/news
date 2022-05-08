import { Alert, Button, TextField } from '@mui/material';
import { FormikHelpers, useFormik } from 'formik';
import React, { FC, useCallback, useState } from 'react';

import { initialValues, LoginSchema, validationSchema } from './schema';
import  './index.module.css';
import { Link } from 'react-router-dom';
import {PAGE_REGISTRATION } from '../../common/paths';
import { useDispatch } from 'react-redux';
import { thunkCreators } from '../../store';
import { messageStatuses } from '../../common/messageStatuses';

const LoginForm: FC = () => {
    const dispatch = useDispatch();
    const [errorLogin, setErrorLogin] = useState<boolean>(false);
    // const navigate = useNavigate();

    // const handleSuccess = useCallback(() => {
    //     navigate(PAGE_LIST_THING);
    // }, [navigate])

    const onSubmit = useCallback((values: LoginSchema, formikHelpers: FormikHelpers<LoginSchema>) => {
        const handleError = (messageStatus: string) => {
            formikHelpers.setSubmitting(false);

            switch (messageStatus) {
                case messageStatuses.NOT_CORRECT_LOGIN_OR_PASSWORD:
                    setErrorLogin(true);
                    formikHelpers.setFieldValue('password', '');
                    break;
            
                default:
                    console.log('messageStatus', messageStatus);
                    break;
            }
        };

        dispatch(thunkCreators.login(values, handleSuccess, handleError));
    }, [dispatch, handleSuccess]);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <form className="LoginFormBody" onSubmit={formik.handleSubmit}>
            {errorLogin && (
                <Alert severity="error" className="ElementForm">
                    Неправильный логин или пароль
                </Alert>
            )}

            <TextField
                label="логин"
                name="login"
                variant="outlined"
                className="ElementForm"
                value={formik.values.login}
                onChange={formik.handleChange}
                error={formik.touched.login && Boolean(formik.errors.login)}
                helperText={formik.touched.login && formik.errors.login}
            />
            <TextField
                label="пароль"
                name="password"
                type="password"
                variant="outlined"
                className="ElementForm"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            <Button
                type="submit"
                variant="contained"
                className="ElementForm"
                disabled={formik.isSubmitting}
            >
                Войти
            </Button>
            <Link to={PAGE_REGISTRATION}>
                Регистрация
            </Link>
        </form>
    );
}

export default LoginForm;
