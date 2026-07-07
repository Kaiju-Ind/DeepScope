import type { TechnologyDefinition } from '../../types';

export const eyefituTechnologyDefinition = {
	id: "eyefitu",
	name: "EyeFitU",
	website: "https://www.eyefitu.com",
	description: "EyeFitU is a Size-as-a-Service AI platform for ecommerce that provides automated sizing intelligence to improve fit accuracy and reduce returns.",
	icon: "EyeFitU.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "eyefitu:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("web-sdk\\.eyefitu\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "eyefitu:jsGlobal:1",
			kind: "jsGlobal",
			property: "eyefitu.version",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "eyefitu:jsGlobal:2",
			kind: "jsGlobal",
			property: "eyefituCalls",
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
