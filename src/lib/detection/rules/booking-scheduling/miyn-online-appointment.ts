import type { TechnologyDefinition } from '../../types';

export const miynOnlineAppointmentTechnologyDefinition = {
	id: "miyn-online-appointment",
	name: "MIYN Online Appointment",
	website: "https://miyn.app/online-appointment",
	description: "MIYN Online Appointment is an advanced cloud-based online appointment scheduling software.",
	icon: "MIYN.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "miyn-online-appointment:jsGlobal:0",
			kind: "jsGlobal",
			property: "MIYNLive.settings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
