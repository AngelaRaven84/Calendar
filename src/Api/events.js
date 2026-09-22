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
