import { useState } from 'react';
import { formatDateKey } from '../../Utils/CalendarUtils';
import './eventForm.css';

function EventForm({ selectedDate, onAddEvent }) {
	const [title, setTitle] = useState('');
	const [time, setTime] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		const newEvent = {
			id: crypto.randomUUID(),
			title,
			time,
			date: formatDateKey(selectedDate),
		};

		onAddEvent(newEvent);

		setTitle('');
		setTime('');
	};

	return (
		<form className='event-form' onSubmit={handleSubmit}>
			<h2>
				Event för
				{selectedDate.toLocaleDateString('sv-SE')}
			</h2>
			<input
				type='text'
				placeholder='Eventtitel'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>

			<button type='submit'>Spara event</button>
		</form>
	);
}
export default EventForm;
