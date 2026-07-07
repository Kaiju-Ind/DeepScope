import type { TechnologyDefinition } from '../../types';

export const datascapeTechnologyDefinition = {
	id: "datascape",
	name: "Datascape",
	website: "https://datacom.com/nz/en/products/datascape/digital-experience/my-datascape",
	description: "Datascape is a cloud-based ERP solution that enables councils to manage services while supporting transparent and collaborative communication.",
	icon: "Datascape.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "datascape:dom:0",
			kind: "dom",
			selector: "link[href*='cdn-sites.datascape.cloud']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "datascape:jsGlobal:1",
			kind: "jsGlobal",
			property: "DatacomSphere",
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
