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
		}),
		{
			name: 'calendar-events',
		},
	),
);
