import type { TechnologyDefinition } from '../../types';

export const selineTechnologyDefinition = {
	id: "seline",
	name: "Seline",
	website: "https://seline.so",
	description: "Seline is a website and product analytics platform that operates cookieless.",
	icon: "Seline.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "seline:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.seline\\.so"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "seline:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.seline\\.so"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
