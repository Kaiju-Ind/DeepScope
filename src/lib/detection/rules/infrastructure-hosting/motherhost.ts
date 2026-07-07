import type { TechnologyDefinition } from '../../types';

export const motherhostTechnologyDefinition = {
	id: "motherhost",
	name: "Motherhost",
	website: "https://www.motherhost.com",
	description: "Motherhost is a web hosting company based in India that offers a range of hosting services, including shared hosting, VPS hosting, dedicated servers, and cloud hosting.",
	icon: "Motherhost.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "motherhost:header:0",
			kind: "header",
			key: "platform",
			valuePattern: new RegExp("^motherhost$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
