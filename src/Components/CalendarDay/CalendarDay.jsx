import './calendarDay.css';

export function CalendarDay({ day, isToday, events, onClick, isSelected }) {
	return (
		<button
			type='button'
			className={`calendar-day ${isToday ? 'calendar-day--today' : ''} ${isSelected ? 'calendar-day--selected' : ''}`}
			onClick={onClick}>
			<span>{day}</span>

			{events.length > 0 && (
				<div className='calendar-day__events'>
					{events.map((event) => (
						<small key={event.id}>{event.title}</small>
					))}
				</div>
			)}
		</button>
	);
}

export default CalendarDay;
