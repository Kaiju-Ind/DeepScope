import type { TechnologyDefinition } from '../../types';

export const velocifyTechnologyDefinition = {
	id: "velocify",
	name: "Velocify",
	website: "https://mortgagetech.ice.com/products/velocify",
	description: "Velocify is a conversion optimization sales tool designed to improve sales processes and increase lead conversion rates.",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "velocify:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.velocify\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
