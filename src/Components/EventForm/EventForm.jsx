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
	const [startTime, setStartTime] = useState(
		eventToEdit?.startTime ?? eventToEdit?.time ?? '',
	);
	const [endTime, setEndTime] = useState(eventToEdit?.endTime ?? '');
	const [error, setError] = useState('');
	const [isSaving, setIsSaving] = useState(false);

	const formattedSelectedDate = selectedDate.toLocaleDateString('sv-SE', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isSaving) return;

		setError('');
		if (!title.trim()) {
			setError('Skriv en titel för händelsen.');
			return;
		}
		if (endTime <= startTime) {
			setError('Sluttiden måste vara senare än starttiden.');
			return;
		}
		setIsSaving(true);

		const eventData = {
			title: title.trim(),
			startTime,
			endTime,
			date: formatDateKey(selectedDate),
		};

		try {
			if (eventToEdit) {
				await onUpdateEvent(eventToEdit.id, eventData);
				onCancelEdit();
			} else {
				await onAddEvent(eventData);
				setTitle('');
				setStartTime('');
				setEndTime('');
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setIsSaving(false);
		}
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
			<label htmlFor='event-time'>Starttid</label>
			<input
				id='event-time'
				type='time'
				value={startTime}
				onChange={(e) => setStartTime(e.target.value)}
				required
			/>
			<label htmlFor='event-end-time'>Sluttid</label>
			<input
				id='event-end-time'
				type='time'
				value={endTime}
				onChange={(e) => setEndTime(e.target.value)}
				required
			/>

			{error && <p role='alert'>{error}</p>}

			<button type='submit' disabled={isSaving}>
				{isSaving
					? 'Sparar...'
					: eventToEdit
						? 'Spara ändringar'
						: 'Spara event'}
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
