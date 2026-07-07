import type { TechnologyDefinition } from '../../types';

export const webstatTechnologyDefinition = {
	id: "webstat",
	name: "WebSTAT",
	website: "https://webstat.com",
	description: "WebSTAT is a web analytics platform designed to provide simplified tracking of website performance and visitor behavior.",
	icon: "WebSTAT.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "webstat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.webstat\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
