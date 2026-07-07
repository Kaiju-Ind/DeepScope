import type { TechnologyDefinition } from '../../types';

export const entrustTechnologyDefinition = {
	id: "entrust",
	name: "Entrust",
	website: "https://www.entrust.com/products/digital-certificates",
	description: "Entrust is a provider of SSL certificate badge for websites.",
	icon: "Entrust.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "entrust:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("seal\\.entrust\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "entrust:jsGlobal:1",
			kind: "jsGlobal",
			property: "goEntrust",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
