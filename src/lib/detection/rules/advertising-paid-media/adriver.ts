import type { TechnologyDefinition } from '../../types';

export const adriverTechnologyDefinition = {
	id: "adriver",
	name: "AdRiver",
	website: "https://adriver.ru",
	description: "AdRiver is a company which provide internet advertising management and audit software.",
	icon: "AdRiver.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "adriver:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.adriver\\.ru\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adriver:dom:1",
			kind: "dom",
			selector: "link[href*='.adriver.ru'], img[src*='.adriver.ru'], iframe[src*='.adriver.ru']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "adriver:jsGlobal:2",
			kind: "jsGlobal",
			property: "AdriverCounter",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adriver:jsGlobal:3",
			kind: "jsGlobal",
			property: "AdriverPrebid",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adriver:jsGlobal:4",
			kind: "jsGlobal",
			property: "adfoxBiddersMap.adriver",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adriver:jsGlobal:5",
			kind: "jsGlobal",
			property: "adriver",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
