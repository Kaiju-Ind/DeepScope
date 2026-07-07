import type { TechnologyDefinition } from '../../types';

export const iadvizeTechnologyDefinition = {
	id: "iadvize",
	name: "iAdvize",
	website: "https://www.iadvize.com",
	description: "iAdvize is a conversational marketing platform that connects customers in need of advice with experts who are available 24/7 via messaging.",
	icon: "iAdvize.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "iadvize:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.iadvize\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "iadvize:dom:1",
			kind: "dom",
			selector: "link[href*='.iadvize.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
