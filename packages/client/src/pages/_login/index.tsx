import React, { FC } from 'react';
import { Paper, Typography } from '@mui/material';

import './index.module.css';
import LoginForm from '../../organisms/LoginForm';

const LoginPage: FC = () => {
    return (
        <Paper className="LoginPage">
            <Typography variant='h5' component='h1' gutterBottom>
                Авторизация
            </Typography>
            <LoginForm />
        </Paper>
    );
}

export default LoginPage;
