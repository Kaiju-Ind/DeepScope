import type { TechnologyDefinition } from '../../types';

export const peftrustTechnologyDefinition = {
	id: "peftrust",
	name: "Peftrust",
	website: "https://www.peftrust.com",
	description: "Peftrust is an environmental scoring and compliance platform for apparel and footwear brands that assesses environmental impact using the European PEF Methodology.",
	icon: "Peftrust.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "peftrust:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.peftrust\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
