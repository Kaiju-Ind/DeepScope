import type { TechnologyDefinition } from '../../types';

export const ikasTechnologyDefinition = {
	id: "ikas",
	name: "Ikas",
	website: "https://ikas.com",
	description: "Ikas is a new generation ecommerce platform designed for small businesses.",
	icon: "Ikas.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ikas:jsGlobal:0",
			kind: "jsGlobal",
			property: "IkasEvents.subscribe",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ikas:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^ikas$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ikas:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^ikas$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"graphql",
		"mongodb",
		"next-js",
	],
} as const satisfies TechnologyDefinition;
