import type { TechnologyDefinition } from '../../types';

export const webotitTechnologyDefinition = {
	id: "webotit",
	name: "Webotit",
	website: "https://www.webotit.ai",
	description: "Webotit is a business tool that provides chatbot, callbot, and mailbot solutions powered by generative AI.",
	icon: "Webotit.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "webotit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.webotit\\.ai"),
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
