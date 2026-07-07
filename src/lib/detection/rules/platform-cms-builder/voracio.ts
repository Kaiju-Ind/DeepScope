import type { TechnologyDefinition } from '../../types';

export const voracioTechnologyDefinition = {
	id: "voracio",
	name: "Voracio",
	website: "https://www.voracio.co.uk",
	description: "Voracio is a cloud SaaS ecommerce platform powered by Microsoft .NET and built on the Microsoft Azure cloud framework.",
	icon: "Voracio.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "voracio:jsGlobal:0",
			kind: "jsGlobal",
			property: "voracio",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "voracio:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^voracio_csrf_token$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "voracio:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^voracio_sessionid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
