import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Calendar from '../../Components/Calendar/Calendar';
import LoginForm from '../../Components/LoginForm/LoginForm';
import './home.css';

export function Home() {
	const [session, setSession] = useState(null);

	const handleLogin = (accessToken) => {
		const { sub } = jwtDecode(accessToken);

		if (typeof sub !== 'string' || !sub) {
			throw new Error('Användar-ID saknas i tokenen');
		}

		setSession({
			accessToken,
			userId: sub,
		});
	};

	return (
		<main>
			{session ? (
				<Calendar userId={session.userId} accessToken={session.accessToken} />
			) : (
				<LoginForm onLogin={handleLogin} />
			)}
		</main>
	);
}

export default Home;
