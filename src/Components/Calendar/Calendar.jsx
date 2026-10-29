import { useEffect, useState } from 'react';
import {
	getEvents,
	createEvent,
	updateEvent as updateEventApi,
	deleteEvent as deleteEventApi,
} from '../../Api/events';
import CalendarDay from '../CalendarDay/CalendarDay';
import EventForm from '../EventForm/EventForm';
import {
	getDaysInMonth,
	getFirstDayOfMonth,
	getMonthName,
	formatDateKey,
} from '../../Utils/CalendarUtils';
import { useCalendarStore } from '../../Store/useCalendarStore';
import './calendar.css';
import heroPhoto from '../../assets/hero-photo.png';

function Calendar({ userId, accessToken, isDemo = false }) {
	const [demoEvents, setDemoEvents] = useState(() => {
		const now = new Date();
		return [
			{ id: 'demo-1', title: 'Projektstund', startTime: '09:00', endTime: '10:00', date: formatDateKey(new Date(now.getFullYear(), now.getMonth(), 8)) },
			{ id: 'demo-2', title: 'Fikapaus', startTime: '14:00', endTime: '14:30', date: formatDateKey(new Date(now.getFullYear(), now.getMonth(), 16)) },
		];
	});
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(null);
	const [editingEvent, setEditingEvent] = useState(null);
	const [isLoading, setIsLoading] = useState(!isDemo);
	const [error, setError] = useState('');

	const setEvents = useCalendarStore((state) => state.setEvents);
	const updateEvent = useCalendarStore((state) => state.updateEvent);
	const accountEvents = useCalendarStore((state) => state.events);
	const events = isDemo ? demoEvents : accountEvents;
	const addEvent = useCalendarStore((state) => state.addEvent);
	const deleteEvent = useCalendarStore((state) => state.deleteEvent);
	const today = new Date();
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();
	const daysInMonth = getDaysInMonth(year, month);
	const firstDayOfMonth = getFirstDayOfMonth(year, month);
	const emptyDays = Array.from({ length: firstDayOfMonth });
	const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

	useEffect(() => {
		if (isDemo) return;

		let ignore = false;

		const loadEvents = async () => {
			try {
				const events = await getEvents(userId, accessToken);

				if (!ignore) {
					setEvents(events);
				}
			} catch (error) {
				if (!ignore) {
					setError(error.message);
				}
			} finally {
				if (!ignore) {
					setIsLoading(false);
				}
			}
		};

		loadEvents();

		return () => {
			ignore = true;
		};
	}, [userId, accessToken, setEvents, isDemo]);

	const handleAddEvent = async (eventData) => {
		if (isDemo) {
			const id = crypto.randomUUID();
			setDemoEvents((events) => [...events, { ...eventData, id }]);
			return;
		}
		const savedEvent = await createEvent(userId, accessToken, eventData);
		addEvent(savedEvent);
	};

	const handleUpdateEvent = async (eventId, updates) => {
		if (isDemo) {
			setDemoEvents((events) => events.map((event) => event.id === eventId ? { ...event, ...updates } : event));
			return;
		}
		const savedEvent = await updateEventApi(
			userId,
			accessToken,
			eventId,
			updates,
		);

		updateEvent(eventId, savedEvent);
	};

	const handlePrevMonth = () => {
		setCurrentDate(new Date(year, month - 1, 1));
		setSelectedDate(null);
		setEditingEvent(null);
	};
	const handleNextMonth = () => {
		setCurrentDate(new Date(year, month + 1, 1));
		setSelectedDate(null);
		setEditingEvent(null);
	};

	const handleDeleteEvent = async (eventId) => {
		const eventToDelete = events.find((event) => event.id === eventId);
		const eventTitle = eventToDelete?.title ?? 'detta event';

		const shouldDelete = window.confirm(
			`Vill du verkligen ta bort '${eventTitle}'?`,
		);

		if (!shouldDelete) return;

		setError('');

		try {
			if (isDemo) {
				setDemoEvents((events) => events.filter((event) => event.id !== eventId));
			} else {
				await deleteEventApi(userId, accessToken, eventId);
				deleteEvent(eventId);
			}

			if (editingEvent?.id === eventId) {
				setEditingEvent(null);
			}
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<section className='calendar'>
			{isLoading && <p role='status'>Hämtar händelser...</p>}
			{error && <p role='alert'>{error}</p>}
			<div className='calendar__eyebrow'>
				<p>
					Personlig almanacka
					<span aria-hidden='true'> | </span>
					Svensk design
				</p>

				<p>
					{getMonthName(month)} {year}
					<span aria-hidden='true'> ♡</span>
				</p>
			</div>

			<img
				className='calendar__hero'
				src={heroPhoto}
				alt='Svenskt landskap med sjö, skog och berg'
			/>

			<div className='calendar__header'>
				<button
					type='button'
					onClick={handlePrevMonth}
					aria-label='Föregående månad'>
					←
				</button>

				<h1 className='calendar__title'>
					{getMonthName(month)} {year}
				</h1>

				<button
					type='button'
					onClick={handleNextMonth}
					aria-label='Nästa månad'>
					→
				</button>
			</div>

			<div className='calendar__weekdays'>
				<p>Mån</p>
				<p>Tis</p>
				<p>Ons</p>
				<p>Tor</p>
				<p>Fre</p>
				<p>Lör</p>
				<p>Sön</p>
			</div>

			<div className='calendar__grid'>
				{emptyDays.map((_, index) => (
					<div
						key={`empty-${index}`}
						className='calendar-day calendar-day--empty'
					/>
				))}

				{days.map((day) => {
					const date = new Date(year, month, day);
					const dateKey = formatDateKey(date);

					const isToday =
						today.getFullYear() === year &&
						today.getMonth() === month &&
						today.getDate() === day;

					const isSelected = selectedDate
						? formatDateKey(selectedDate) === dateKey
						: false;

					const dayEvents = events
						.filter((event) => event.date === dateKey)
						.sort((a, b) =>
							(a.startTime ?? a.time ?? '').localeCompare(
								b.startTime ?? b.time ?? '',
							),
						);

					return (
						<CalendarDay
							key={day}
							day={day}
							isToday={isToday}
							isSelected={isSelected}
							events={dayEvents}
							onClick={() => {
								setSelectedDate(date);
								setEditingEvent(null);
							}}
							onEditEvent={(event) => {
								setSelectedDate(date);
								setEditingEvent(event);
							}}
							onDeleteEvent={handleDeleteEvent}
						/>
					);
				})}
			</div>

			<p className='calendar__hint'>Välj ett datum för att se dagens händelser eller lägga till en ny. På mobilen visar markeringen hur många händelser dagen har.</p>
			{selectedDate && (
				<section className='calendar__day-details' aria-label='Händelser för valt datum'>
					<h2>{selectedDate.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' })}</h2>
					{events.filter((event) => event.date === formatDateKey(selectedDate)).length === 0 && <p>Inga händelser ännu. Lägg till en nedan.</p>}
					<ul>
						{events.filter((event) => event.date === formatDateKey(selectedDate))
							.sort((a, b) => (a.startTime ?? '').localeCompare(b.startTime ?? ''))
							.map((event) => (
								<li key={event.id}>
									<p><strong>{event.title}</strong><br />{event.startTime ?? event.time}–{event.endTime}</p>
									<div>
										<button type='button' aria-label={`Redigera ${event.title}`} onClick={() => setEditingEvent(event)}>Redigera</button>
										<button type='button' aria-label={`Ta bort ${event.title}`} onClick={() => handleDeleteEvent(event.id)}>Ta bort</button>
									</div>
								</li>
							))}
					</ul>
				</section>
			)}
			{selectedDate && (
				<EventForm
					key={editingEvent?.id ?? formatDateKey(selectedDate)}
					selectedDate={selectedDate}
					onAddEvent={handleAddEvent}
					eventToEdit={editingEvent}
					onUpdateEvent={handleUpdateEvent}
					onCancelEdit={() => setEditingEvent(null)}
				/>
			)}
		</section>
	);
}

export default Calendar;
