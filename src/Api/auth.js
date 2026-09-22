export const login = async (identifier, password) => {
	const apiUrl = import.meta.env.VITE_API_URL;

	if (!apiUrl) {
		throw new Error('API-adressen saknas');
	}

	const response = await fetch(`${apiUrl.replace(/\/$/, '')}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ identifier, password }),
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message ?? 'Inloggningen misslyckades');
	}

	return data;
};
