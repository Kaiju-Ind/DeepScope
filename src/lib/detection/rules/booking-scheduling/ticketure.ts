import type { TechnologyDefinition } from '../../types';

export const ticketureTechnologyDefinition = {
	id: "ticketure",
	name: "Ticketure",
	website: "https://tixtrack.com/ticketure-timed-entry-ticketing",
	description: "Ticketure is a cloud-based admission ticketing system designed for arts and cultural organizations with timed entry requirements.",
	icon: "Ticketure.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "ticketure:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Built by Ticketure", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "ticketure:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^built by ticketure", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
