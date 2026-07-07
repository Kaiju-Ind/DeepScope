import type { TechnologyDefinition } from '../../types';

export const pyzeTechnologyDefinition = {
	id: "pyze",
	name: "Pyze",
	website: "https://www.pyze.com",
	description: "Pyze is a digital platform that provides analytics and engagement tools to support and measure digital transformation initiatives.",
	icon: "Pyze.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "pyze:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.pyze\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pyze:jsGlobal:1",
			kind: "jsGlobal",
			property: "Pyze.getAppInstanceId",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pyze:jsGlobal:2",
			kind: "jsGlobal",
			property: "PyzeCuratedEvents",
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
