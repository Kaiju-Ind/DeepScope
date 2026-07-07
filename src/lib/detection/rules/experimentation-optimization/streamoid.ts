import type { TechnologyDefinition } from '../../types';

export const streamoidTechnologyDefinition = {
	id: "streamoid",
	name: "Streamoid",
	website: "https://www.streamoid.com",
	description: "Streamoid is a fashion AI optimization and personalization solution, enhancing user experiences through tailored recommendations.",
	icon: "Streamoid.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "streamoid:dom:0",
			kind: "dom",
			selector: "link[href*='.sdk.streamoid.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
