import type { TechnologyDefinition } from '../../types';

export const huggyTechnologyDefinition = {
	id: "huggy",
	name: "Huggy",
	website: "https://www.huggy.io",
	description: "Huggy is a service automation platform that centralizes operations and integrates chatbots capable of responding at any time.",
	icon: "Huggy.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "huggy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.huggy\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "huggy:jsGlobal:1",
			kind: "jsGlobal",
			property: "Huggy.closeBox",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
