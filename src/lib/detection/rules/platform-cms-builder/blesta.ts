import type { TechnologyDefinition } from '../../types';

export const blestaTechnologyDefinition = {
	id: "blesta",
	name: "Blesta",
	website: "https://www.blesta.com",
	description: "Blesta is a billing platform tailored for web hosting providers, featuring client management, automated billing, and support systems.",
	icon: "Blesta.png",
	categories: [
		"platform-cms-builder",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "blesta:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^blesta_sid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
