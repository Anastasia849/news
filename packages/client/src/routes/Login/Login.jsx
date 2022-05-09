import { login, logout, registration, userActionCreator, userGetters } from '../../bll/reducers/reducerUser';
import { useDispatch, useSelector, connect } from 'react-redux';
import './index.css';
import { React, useEffect, useState } from 'react';

function Login(props) {
	const [ isRegistration, setIsRegistration ] = useState(false);
	useEffect(
		() => {
			if (props.loginError) {
				setShowError(props.loginError);
				setTimeout(() => {
					setShowError(null);
					dispatch(userActionCreator.changeLoginError(""))
				}, 1000);
			}
		},
		[ props.loginError ]
	);

	const [ showError, setShowError ] = useState(null);
	const [ inputLogin, setLogin ] = useState('');
	const [ password, setPassword ] = useState('');
	const user = useSelector((state) => state.reducerUser.user),
		dispatch = useDispatch();

	const submitLogin = async (e) => {
		e.preventDefault();
		if (inputLogin && password) {
			dispatch(login(inputLogin, password));
		} else {
			dispatch(userActionCreator.changeLoginError('Заполните обязательные поля'));
		}
	};

	const submitRegistration = async (e) => {
		e.preventDefault();
		if (inputLogin && password) {
			dispatch(registration(inputLogin, password));
		} else {
			dispatch(userActionCreator.changeLoginError('Заполните обязательные поля'));
		}
	};

	const submitLogout = () => {
		dispatch(logout());
	};

	return (
		<div className="login-page d-flex justify-content-center h-100">
			<div className="form-container">
				{user.login ? (
					<div className="logout-block">
						<p>Выйти из аккаунта?</p>
						<button className="main-btn mt-25" onClick={submitLogout}>
							Выйти
						</button>
					</div>
				) : !isRegistration ? (
					<form onSubmit={submitLogin} className="form-block" action="#">
						<h3>Вход</h3>
						<label htmlFor="input-login">Логин</label>
						<input
							value={inputLogin}
							onChange={(e) => setLogin(e.currentTarget.value)}
							id="input-login"
							name="login"
							type="text"
						/>
						<label htmlFor="input-password">Пароль</label>
						<input
							value={password}
							onChange={(e) => setPassword(e.currentTarget.value)}
							type="password"
							name="password"
							id="input-password"
						/>
						{showError ? <div className="form-block__error">{showError}</div> : null}
						<div className="align-items-center d-flex justify-content-between mt-3 w-100">
							<button type="button" className="btn" onClick={() => setIsRegistration(true)}>
								Зарегистрироваться
							</button>
							<button className="btn btn-info">Войти</button>
						</div>
					</form>
				) : (
					<form onSubmit={submitRegistration} className="form-block" action="#">
						<h3>Регистрация</h3>
						<label htmlFor="input-login">Логин</label>
						<input
							value={inputLogin}
							onChange={(e) => setLogin(e.currentTarget.value)}
							id="input-login"
							name="login"
							type="text"
						/>
						<label htmlFor="input-password">Пароль</label>
						<input
							value={password}
							onChange={(e) => setPassword(e.currentTarget.value)}
							type="password"
							name="password"
							id="input-password"
						/>
						{showError ? <div className="form-block__error">{showError}</div> : null}
						<div className="align-items-center d-flex justify-content-between mt-3 w-100">
							<button type="button" className="btn" onClick={() => setIsRegistration(false)}>
								Войти
							</button>
							<button className="btn btn-info">Зарегистрироваться</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	loginError: userGetters.getLoginError(state)
});

export default connect(mapStateToProps, null)(Login);
