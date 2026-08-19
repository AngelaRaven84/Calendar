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
			id: crypto.randomUUID(),
			...eventData,
		});

		setTitle('');
		setTime('');
	};

	return (
		<form className='event-form' onSubmit={handleSubmit}>
			<h2>
				{eventToEdit ? 'Redigera event för ' : 'Event för '}
				{selectedDate.toLocaleDateString('sv-SE')}
			</h2>
			<input
				type='text'
				placeholder='Eventtitel'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
			<input
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
