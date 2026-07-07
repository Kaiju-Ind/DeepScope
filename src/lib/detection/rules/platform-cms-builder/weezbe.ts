import type { TechnologyDefinition } from '../../types';

export const weezbeTechnologyDefinition = {
	id: "weezbe",
	name: "Weezbe",
	website: "https://www.weezbe.com",
	description: "Weezbe is an ecommerce solution that enables businesses to create and manage online stores.",
	icon: "Weezbe.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "weezbe:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.weezbe\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "weezbe:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("static\\.weezbe\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
