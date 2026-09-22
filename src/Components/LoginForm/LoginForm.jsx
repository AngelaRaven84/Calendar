import { useState } from 'react';
import { login } from '../../Api/auth';

function LoginForm({ onLogin }) {
	const [identifier, setIdentifier] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError('');
		setIsLoading(true);

		try {
			const data = await login(identifier, password);
			onLogin(data.accessToken);
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form className='event-form' onSubmit={handleSubmit}>
			<h2>Logga in</h2>

			<label htmlFor='login-identifier'>Användarnamn eller e-post</label>
			<input
				id='login-identifier'
				type='text'
				autoComplete='username'
				value={identifier}
				onChange={(event) => setIdentifier(event.target.value)}
				required
			/>

			<label htmlFor='login-password'>Lösenord</label>
			<input
				id='login-password'
				type='password'
				autoComplete='current-password'
				value={password}
				onChange={(event) => setPassword(event.target.value)}
				required
			/>

			{error && <p role='alert'>{error}</p>}

			<button type='submit' disabled={isLoading}>
				{isLoading ? 'Loggar in...' : 'Logga in'}
			</button>
		</form>
	);
}

export default LoginForm;
