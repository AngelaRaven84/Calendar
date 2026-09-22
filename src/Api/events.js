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
