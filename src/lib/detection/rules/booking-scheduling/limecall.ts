import type { TechnologyDefinition } from '../../types';

export const limecallTechnologyDefinition = {
	id: "limecall",
	name: "Limecall",
	website: "https://limecall.com",
	description: "Limecall is a software platform that facilitates instant callback requests and manages call scheduling to enhance customer engagement and lead generation processes.",
	icon: "Limecall.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "limecall:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.limecall\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "limecall:dom:1",
			kind: "dom",
			selector: "script[data-api-url*='app.limecall.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "limecall:jsGlobal:2",
			kind: "jsGlobal",
			property: "limeCallClient",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
