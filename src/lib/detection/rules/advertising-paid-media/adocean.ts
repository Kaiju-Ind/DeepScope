import type { TechnologyDefinition } from '../../types';

export const adoceanTechnologyDefinition = {
	id: "adocean",
	name: "AdOcean",
	website: "https://adocean-global.com",
	icon: "AdOcean.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "adocean:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("adocean\\.pl\\/files\\/js\\/ado\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adocean:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("adocean\\.pl"),
			confidence: 80,
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adocean:jsGlobal:2",
			kind: "jsGlobal",
			property: "ado.master",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adocean:jsGlobal:3",
			kind: "jsGlobal",
			property: "ado.placement",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adocean:jsGlobal:4",
			kind: "jsGlobal",
			property: "ado.slave",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"gemius",
	],
} as const satisfies TechnologyDefinition;
