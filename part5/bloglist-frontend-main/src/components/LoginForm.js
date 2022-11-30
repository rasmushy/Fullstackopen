import { useState } from 'react';

const LoginForm = ({ handleLogin }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const userLogin = (event) => {
		event.preventDefault();
		console.log('logging in with', username, password);
		handleLogin({ username, password, setUsername, setPassword });
	};

	return (
		<div>
			<h2>Log in to application</h2>
			<form onSubmit={userLogin}>
				<div>
					username
					<input
						type='text'
						value={username}
						name='Username'
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type='password'
						value={password}
						name='Password'
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type='submit'>Login</button>
			</form>
		</div>
	);
};

export default LoginForm;
