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
		}),
		{
			name: 'calendar-events',
		},
	),
);
