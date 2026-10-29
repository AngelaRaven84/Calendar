import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Calendar from '../../Components/Calendar/Calendar';
import LoginForm from '../../Components/LoginForm/LoginForm';
import './home.css';

export function Home() {
	const [session, setSession] = useState(null);
	const [mode, setMode] = useState('welcome');

	const handleLogin = (accessToken) => {
		const { sub } = jwtDecode(accessToken);

		if (typeof sub !== 'string' || !sub) {
			throw new Error('Användar-ID saknas i tokenen');
		}

		setMode('account');
		setSession({
			accessToken,
			userId: sub,
		});
	};

	const leaveCalendar = () => {
		setSession(null);
		setMode('welcome');
	};

	return (
		<main>
			{mode === 'welcome' ? (
				<section className='welcome'>
					<p className='welcome__label'>Pågående fritidsprojekt</p>
					<h1>Calendar</h1>
					<p>En personlig almanacka under utveckling. Prova kalendern med påhittade händelser, helt utan konto.</p>
					<p>I demon kan du lägga till, redigera och ta bort händelser. Ändringarna finns bara under besöket och skickas inte till någon server.</p>
					<div className='welcome__actions'>
						<button type='button' onClick={() => setMode('demo')}>Prova kalendern</button>
						<button type='button' onClick={() => setMode('login')}>Logga in med konto</button>
					</div>
				</section>
			) : mode === 'demo' || session ? (
				<>
					<div className='project-banner'>
						<p>{mode === 'demo' ? 'Demo av ett pågående fritidsprojekt. Exempeldata och ändringar sparas inte.' : 'Pågående fritidsprojekt · Inloggad med konto'}</p>
						<button type='button' onClick={leaveCalendar}>{mode === 'demo' ? 'Avsluta demo' : 'Logga ut'}</button>
					</div>
					<Calendar key={mode} isDemo={mode === 'demo'} userId={session?.userId} accessToken={session?.accessToken} />
				</>
			) : (
				<>
					<div className='project-banner'>
						<p>Kontoinloggning för den befintliga skolversionen. Vill du bara prova kalendern? Välj demon på startsidan.</p>
						<button type='button' onClick={leaveCalendar}>Till startsidan</button>
					</div>
					<LoginForm onLogin={handleLogin} />
				</>
			)}
		</main>
	);

}

export default Home;
