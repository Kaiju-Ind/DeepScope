import type { TechnologyDefinition } from '../../types';

export const crikleTechnologyDefinition = {
	id: "crikle",
	name: "Crikle",
	website: "https://www.crikle.com",
	description: "Crikle is a multichannel customer engagement software.",
	icon: "Crikle.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "crikle:jsGlobal:0",
			kind: "jsGlobal",
			property: "crikle.contactId",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "crikle:jsGlobal:1",
			kind: "jsGlobal",
			property: "crikle.openConvertWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
