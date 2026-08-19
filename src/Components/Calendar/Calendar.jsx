import { useState } from 'react';
import CalendarDay from '../CalendarDay/CalendarDay';
import EventForm from '../EventForm/EventForm';
import {
	getDaysInMonth,
	getFirstDayOfMonth,
	getMonthName,
	formatDateKey,
} from '../../Utils/CalendarUtils';
import './calendar.css';

function Calendar() {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(null);
	const [events, setEvents] = useState([]);

	const today = new Date();
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();
	const daysInMonth = getDaysInMonth(year, month);
	const firstDayOfMonth = getFirstDayOfMonth(year, month);
	const emptyDays = Array.from({ length: firstDayOfMonth });
	const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

	const handlePrevMonth = () => {
		setCurrentDate(new Date(year, month - 1, 1));
		setSelectedDate(null);
	};
	const handleNextMonth = () => {
		setCurrentDate(new Date(year, month + 1, 1));
		setSelectedDate(null);
	};

	const handleAddEvent = (newEvent) => {
		setEvents([...events, newEvent]);
	};

	return (
		<section className='calendar'>
			<div className='calendar__header'>
				<button type='button' onClick={handlePrevMonth}>
					←
				</button>

				<h1 className='calendar__title'>
					{getMonthName(month)} {year}
				</h1>

				<button type='button' onClick={handleNextMonth}>
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

					const dayEvents = events.filter((event) => event.date === dateKey);

					return (
						<CalendarDay
							key={day}
							day={day}
							isToday={isToday}
							isSelected={isSelected}
							events={dayEvents}
							onClick={() => setSelectedDate(date)}
						/>
					);
				})}
			</div>

			{selectedDate && (
				<EventForm selectedDate={selectedDate} onAddEvent={handleAddEvent} />
			)}
		</section>
	);
}

export default Calendar;
