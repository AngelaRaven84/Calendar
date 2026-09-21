import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { formatDateKey } from '../../Utils/CalendarUtils';
import './eventForm.css';

function EventForm({
	selectedDate,
	onAddEvent,
	eventToEdit = null,
	onUpdateEvent,
	onCancelEdit,
}) {
	const [title, setTitle] = useState(eventToEdit?.title ?? '');
	const [time, setTime] = useState(eventToEdit?.time ?? '');

	const formattedSelectedDate = selectedDate.toLocaleDateString('sv-SE', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		const eventData = {
			title,
			time,
			date: formatDateKey(selectedDate),
		};

		if (eventToEdit) {
			onUpdateEvent(eventToEdit.id, eventData);
			onCancelEdit();
			return;
		}

		onAddEvent({
			id: uuidv4(),
			...eventData,
		});

		setTitle('');
		setTime('');
	};

	return (
		<form className='event-form' onSubmit={handleSubmit}>
			<h2>
				{eventToEdit ? 'Redigera event för ' : 'Event för '}
				{formattedSelectedDate}
			</h2>
			<label htmlFor='event-title'>Titel</label>
			<input
				id='event-title'
				type='text'
				placeholder='Eventtitel'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
			<label htmlFor='event-time'></label>
			<input
				id='event-time'
				type='time'
				value={time}
				onChange={(e) => setTime(e.target.value)}
				required
			/>

			<button type='submit'>
				{eventToEdit ? 'Spara ändringar' : 'Spara event'}
			</button>

			{eventToEdit && (
				<button type='button' onClick={onCancelEdit}>
					Avbryt
				</button>
			)}
		</form>
	);
}
export default EventForm;
