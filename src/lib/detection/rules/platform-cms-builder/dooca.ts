import type { TechnologyDefinition } from '../../types';

export const doocaTechnologyDefinition = {
	id: "dooca",
	name: "Dooca",
	website: "https://www.dooca.com.br",
	description: "Dooca is an ecommerce platform from Brazil.",
	icon: "Dooca.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "dooca:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.dooca\\.store\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dooca:jsGlobal:1",
			kind: "jsGlobal",
			property: "dooca",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
