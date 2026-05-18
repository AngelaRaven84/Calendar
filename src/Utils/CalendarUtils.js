export function getDaysInMonth(year, month) {
	return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
	const day = new Date(year, month, 1).getDay();

	return day === 0 ? 6 : day - 1;
}

export function getMonthName(month) {
	const monthNames = [
		'Januari',
		'Februari',
		'Mars',
		'April',
		'Maj',
		'Juni',
		'Juli',
		'Augusti',
		'September',
		'Oktober',
		'November',
		'December',
	];
	return monthNames[month];
}

export function formatDateKey(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}
