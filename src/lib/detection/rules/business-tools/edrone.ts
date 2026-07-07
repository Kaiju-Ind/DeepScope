import type { TechnologyDefinition } from '../../types';

export const edroneTechnologyDefinition = {
	id: "edrone",
	name: "Edrone",
	website: "https://edrone.me",
	description: "Edrone is a purpose-built ecommerce CRM that includes marketing automation and voice commerce features.",
	icon: "Edrone.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "edrone:jsGlobal:0",
			kind: "jsGlobal",
			property: "_edrone",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "edrone:jsGlobal:1",
			kind: "jsGlobal",
			property: "_edrone.version",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "edrone:jsGlobal:2",
			kind: "jsGlobal",
			property: "_edrone_send_handler",
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
