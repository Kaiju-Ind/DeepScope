import type { TechnologyDefinition } from '../../types';

export const peechoTechnologyDefinition = {
	id: "peecho",
	name: "Peecho",
	website: "https://www.peecho.com",
	description: "Peecho is a service that enables the sale of digital publications as printed physical products.",
	icon: "Peecho.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "peecho:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.peecho\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
