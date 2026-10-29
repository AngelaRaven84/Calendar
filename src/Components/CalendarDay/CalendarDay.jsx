import './calendarDay.css';

export function CalendarDay({
	day,
	isToday,
	events,
	onClick,
	isSelected,
	onDeleteEvent,
	onEditEvent,
}) {
	return (
		<div
			className={`calendar-day ${isToday ? 'calendar-day--today' : ''} ${isSelected ? 'calendar-day--selected' : ''}`}>
			<button type='button' className='calendar-day__select' onClick={onClick} aria-pressed={isSelected} aria-label={`${day}, ${events.length} händelser`}>
				<span>{day}</span>
				{events.length > 0 && <span className="calendar-day__count" aria-hidden="true">{events.length}</span>}
			</button>

			{events.length > 0 && (
				<div className='calendar-day--events'>
					{events.map((event) => (
						<div className='calendar-day__event' key={event.id}>
							<small>
								{event.startTime ?? event.time}
								{event.endTime ? `-${event.endTime}` : ''} - {event.title}
							</small>

							<button
								type='button'
								className='calendar-day__edit'
								onClick={() => onEditEvent(event)}
								aria-label={`Redigera ${event.title}`}>
								Redigera
							</button>

							<button
								type='button'
								className='calendar-day__delete'
								onClick={() => onDeleteEvent(event.id)}
								aria-label={`Ta bort ${event.title}`}>
								X
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default CalendarDay;
