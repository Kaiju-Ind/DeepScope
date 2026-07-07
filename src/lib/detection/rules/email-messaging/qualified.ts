import type { TechnologyDefinition } from '../../types';

export const qualifiedTechnologyDefinition = {
	id: "qualified",
	name: "Qualified",
	website: "https://www.qualified.com",
	description: "Qualified is a B2B marketer that allows buyers and sales reps to connect through real-time website conversations.",
	icon: "Qualified.svg",
	categories: [
		"email-messaging",
		"marketing-automation",
	],
	rules: [
		{
			id: "qualified:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.qualified\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "qualified:jsGlobal:1",
			kind: "jsGlobal",
			property: "QualifiedObject",
			valuePattern: new RegExp("^qualified$"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "qualified:jsGlobal:2",
			kind: "jsGlobal",
			property: "qualified",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
