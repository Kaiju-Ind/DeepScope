import type { TechnologyDefinition } from '../../types';

export const citrixTechnologyDefinition = {
	id: "citrix",
	name: "Citrix",
	website: "https://www.citrix.com",
	description: "Citrix is a people-centric solutions provider offering software that enables employees to work and collaborate remotely, irrespective of their device or network.",
	icon: "Citrix.svg",
	categories: [
		"network-hardware",
	],
	rules: [
		{
			id: "citrix:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/ctxs\\.core\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "citrix:jsGlobal:1",
			kind: "jsGlobal",
			property: "AddHeaderAndBarForCitrix",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "citrix:jsGlobal:2",
			kind: "jsGlobal",
			property: "CTXS.AccessGateway",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "citrix:jsGlobal:3",
			kind: "jsGlobal",
			property: "CTXS.WebApiClient",
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
