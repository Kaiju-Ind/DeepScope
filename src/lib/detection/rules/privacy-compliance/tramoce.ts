import type { TechnologyDefinition } from '../../types';

export const tramoceTechnologyDefinition = {
	id: "tramoce",
	name: "Tramoce",
	website: "https://tramoce.com",
	description: "Tramoce is a platform that helps websites maintain cookie compliance while ensuring a smooth and uninterrupted browsing experience for users.",
	icon: "Tramoce.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "tramoce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.tramoce\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
