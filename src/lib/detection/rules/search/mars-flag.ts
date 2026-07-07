import type { TechnologyDefinition } from '../../types';

export const marsFlagTechnologyDefinition = {
	id: "mars-flag",
	name: "Mars Flag",
	website: "https://www.marsflag.com/en",
	description: "Mars Flag is a search platform provider originating from Japan, known for its leading domestic market share in website search services.",
	icon: "MarsFlag.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "mars-flag:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.marsflag\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mars-flag:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^marsflag\\-_zldp$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
