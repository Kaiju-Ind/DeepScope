import type { TechnologyDefinition } from '../../types';

export const royalMailTechnologyDefinition = {
	id: "royal-mail",
	name: "Royal Mail",
	website: "https://www.royalmail.com",
	description: "Royal Mail is a British multinational postal service and courier company.",
	icon: "Royal Mail.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "royal-mail:text:0",
			kind: "text",
			pattern: new RegExp("\\bRoyal Mail\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
