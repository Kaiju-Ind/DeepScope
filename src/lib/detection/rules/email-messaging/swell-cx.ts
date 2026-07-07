import type { TechnologyDefinition } from '../../types';

export const swellCxTechnologyDefinition = {
	id: "swell-cx",
	name: "Swell CX",
	website: "https://www.swellcx.com",
	description: "Swell CX is an online reviews and website visitor chat system.",
	icon: "SwellCX.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "swell-cx:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("platform\\.swellcx\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "swell-cx:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("platform\\.swellcx\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
