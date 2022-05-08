import { Paper, Typography } from '@mui/material';
import React, { FC } from 'react';
import RegistrationForm from '../../organisms/RegistrationForm';

import  './index.module.css';

const RegistrationPage: FC = () => {
    return (
        <Paper className="RegistrationPage">
            <Typography variant='h5' component='h1' gutterBottom>
                Регистрация
            </Typography>
            <RegistrationForm />
        </Paper>
    );
}

export default RegistrationPage;
