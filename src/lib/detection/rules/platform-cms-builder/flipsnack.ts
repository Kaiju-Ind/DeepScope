import type { TechnologyDefinition } from '../../types';

export const flipsnackTechnologyDefinition = {
	id: "flipsnack",
	name: "Flipsnack",
	website: "https://www.flipsnack.com",
	description: "Flipsnack is a web-based platform that allows users to create and publish interactive digital flipbooks.",
	icon: "Flipsnack.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "flipsnack:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.flipsnack\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "flipsnack:header:1",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^flipsnack$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "flipsnack:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^flipsnack$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
