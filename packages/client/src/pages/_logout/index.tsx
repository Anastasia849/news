import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { PAGE_LOGIN } from '../../common/paths';
import { useActions } from '../../store';

const LogoutPage: FC = () => {
    const { logout } = useActions();
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        navigate(PAGE_LOGIN, {
            replace: true,
        });
    }, [logout, navigate]);

    return null;
}

export default LogoutPage;
