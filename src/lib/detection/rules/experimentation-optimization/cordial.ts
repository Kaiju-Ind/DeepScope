import type { TechnologyDefinition } from '../../types';

export const cordialTechnologyDefinition = {
	id: "cordial",
	name: "Cordial",
	website: "https://cordial.com",
	description: "Cordial is a cross-channel marketing and customer engagement platform for enterprise brands to send personalized email, SMS, mobile push notifications.",
	icon: "Cordial.svg",
	categories: [
		"experimentation-optimization",
		"marketing-automation",
	],
	rules: [
		{
			id: "cordial:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cordial\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cordial:jsGlobal:1",
			kind: "jsGlobal",
			property: "CordialJS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cordial:jsGlobal:2",
			kind: "jsGlobal",
			property: "CordialObject",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cordial:jsGlobal:3",
			kind: "jsGlobal",
			property: "Cordial_trackUrl",
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
