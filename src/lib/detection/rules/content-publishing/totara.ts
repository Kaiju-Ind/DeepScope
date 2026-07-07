import type { TechnologyDefinition } from '../../types';

export const totaraTechnologyDefinition = {
	id: "totara",
	name: "Totara",
	website: "https://www.totaralearning.com",
	description: "Totara is a learning management system designed for businesses.",
	icon: "Totara.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "totara:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^TotaraSession$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "totara:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^totarasession$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
		cpe: "cpe:2.3:a:totara:totara:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
