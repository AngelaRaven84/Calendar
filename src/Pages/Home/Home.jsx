import { useState } from 'react';
import Calendar from '../../Components/Calendar/Calendar';
import LoginForm from '../../Components/LoginForm/LoginForm';
import './home.css';

export function Home() {
	const [accessToken, setAccessToken] = useState('');

	return (
		<main>
			{accessToken ? <Calendar /> : <LoginForm onLogin={setAccessToken} />}
		</main>
	);
}

export default Home;
