import type { TechnologyDefinition } from '../../types';

export const meetupExpressTechnologyDefinition = {
	id: "meetup-express",
	name: "Meetup Express",
	website: "https://meetupexpress.com",
	description: "Meetup Express is an appointment scheduling system designed to simplify booking and managing meetings.",
	icon: "MeetupExpress.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "meetup-express:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^meetup_express_quick_appointment_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
