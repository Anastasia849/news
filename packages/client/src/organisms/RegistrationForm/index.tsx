import { Button, TextField } from '@mui/material';
import { FormikHelpers, useFormik } from 'formik';
import React, { FC, useCallback } from 'react';

import { initialValues, RegistrationSchema, validationSchema } from './schema';
import  './index.module.css';
import { Link, useNavigate } from 'react-router-dom';
import {PAGE_LOGIN } from '../../common/paths';
import { useDispatch } from 'react-redux';
import { thunkCreators } from '../../store';
import { messageStatuses } from '../../common/messageStatuses';
import { RegistrationArgs } from '../../api/query/registration';


const RegistrationForm: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSuccess = useCallback(() => {
        navigate(PAGE_LOGIN);
    }, [navigate]);

    const onSubmit = useCallback(async (values: RegistrationSchema, formikHelpers: FormikHelpers<RegistrationSchema>) => {
        formikHelpers.setSubmitting(true);
        const handleError = (messageStatus: string) => {
            formikHelpers.setSubmitting(false);

            switch (messageStatus) {
                case messageStatuses.USER_ALREADY_EXIST:
                    formikHelpers.setFieldError('login', 'Логин уже занят');
                    break;
            
                default:
                    console.log('messageStatus', messageStatus);
                    break;
            }
        };



        const registrationData: RegistrationArgs = {
            login: values.login,
            password: values.password,
        }
        dispatch(thunkCreators.registration(registrationData,handleSuccess,handleError))
    }, [dispatch]);
    //     dispatch(thunkCreators.registration(registrationData, handleSuccess, handleError));
    // }, [dispatch, handleSuccess]);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });



    return (
        <form className="RegistrationFormBody" onSubmit={formik.handleSubmit}>
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
            <TextField
                label="повторите пароль"
                name="passwordAgain"
                type="password"
                variant="outlined"
                className="ElementForm"
                value={formik.values.passwordAgain}
                onChange={formik.handleChange}
                error={formik.touched.passwordAgain && Boolean(formik.errors.passwordAgain)}
                helperText={formik.touched.passwordAgain && formik.errors.passwordAgain}
            />
            <Button
                type="submit"
                variant="contained"
                className="ElementForm"
                disabled={formik.isSubmitting}
            >
                Зарегестрироваться
            </Button>
            <Link to={PAGE_LOGIN}>
                Войти
            </Link>
        </form>
    );
}

export default RegistrationForm;
