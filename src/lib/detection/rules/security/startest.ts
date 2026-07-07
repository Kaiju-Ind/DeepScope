import type { TechnologyDefinition } from '../../types';

export const startestTechnologyDefinition = {
	id: "startest",
	name: "StarTest",
	website: "https://startest.top",
	description: "StarTest is a CAPTCHA provider that safeguards websites, mobile apps, and APIs from automated bot-driven attacks.",
	icon: "StarTest.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "startest:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.startest\\.top"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
