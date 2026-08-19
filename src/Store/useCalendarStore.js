import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCalendarStore = create(
	persist(
		(set) => ({
			events: [],

			addEvent: (newEvent) =>
				set((state) => ({
					events: [...state.events, newEvent],
				})),

			deleteEvent: (eventId) =>
				set((state) => ({
					events: state.events.filter((event) => event.id !== eventId),
				})),

			updateEvent: (eventId, updates) =>
				set((state) => ({
					events: state.events.map((event) =>
						event.id === eventId ? { ...event, ...updates } : event,
					),
				})),
		}),
		{
			name: 'calendar-events',
		},
	),
);
