import type { TechnologyDefinition } from '../../types';

export const cartpandaTechnologyDefinition = {
	id: "cartpanda",
	name: "Cartpanda",
	website: "https://cartpanda.com",
	description: "Cartpanda is a platform for selling physical and digital products online, previously known as CartX.",
	icon: "Cartpanda.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cartpanda:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cartpanda\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cartpanda:jsGlobal:1",
			kind: "jsGlobal",
			property: "Cartpanda",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cartpanda:jsGlobal:2",
			kind: "jsGlobal",
			property: "Cartx",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
