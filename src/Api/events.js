export const getEvents = async (userId, accessToken) => {
	const apiUrl = import.meta.env.VITE_API_URL;

	if (!apiUrl) {
		throw new Error('API-adressen saknas');
	}

	const response = await fetch(
		`${apiUrl.replace(/\/$/, '')}/users/${encodeURIComponent(userId)}/events`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	);

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message ?? 'Kunde inte hämta händelser');
	}

	return data;
};

export const createEvent = async (userId, accessToken, eventData) => {
	const apiUrl = import.meta.env.VITE_API_URL;

	if (!apiUrl) {
		throw new Error('API-adressen saknas');
	}

	const response = await fetch(
		`${apiUrl.replace(/\/$/, '')}/users/${encodeURIComponent(userId)}/events`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(eventData),
		},
	);

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message ?? 'Kunde inte skapa händelsen');
	}

	return data;
};

export const updateEvent = async (userId, accessToken, eventId, updates) => {
	const apiUrl = import.meta.env.VITE_API_URL;

	if (!apiUrl) {
		throw new Error('API-adressen saknas');
	}

	const response = await fetch(
		`${apiUrl.replace(/\/$/, '')}/users/${encodeURIComponent(userId)}/events/${encodeURIComponent(eventId)}`,
		{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(updates),
		},
	);

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message ?? 'Kunde inte uppdatera händelsen');
	}

	return data;
};

export const deleteEvent = async (userId, accessToken, eventId) => {
	const apiUrl = import.meta.env.VITE_API_URL;

	if (!apiUrl) {
		throw new Error('API-adressen saknas');
	}

	const response = await fetch(
		`${apiUrl.replace(/\/$/, '')}/users/${encodeURIComponent(userId)}/events/${encodeURIComponent(eventId)}`,
		{
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	);

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message ?? 'Kunde inte radera händelsen');
	}

	return data;
};
