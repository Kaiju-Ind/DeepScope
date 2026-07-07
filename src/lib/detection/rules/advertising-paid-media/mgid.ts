import type { TechnologyDefinition } from '../../types';

export const mgidTechnologyDefinition = {
	id: "mgid",
	name: "MGID",
	website: "https://www.mgid.com",
	description: "MGID is a programmatic advertising platform frequently used by misinformation websites.",
	icon: "MGID.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "mgid:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.mgid\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mgid:jsGlobal:1",
			kind: "jsGlobal",
			property: "MgSensor.mgqWorker",
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
