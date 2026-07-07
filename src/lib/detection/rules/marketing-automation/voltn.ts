import type { TechnologyDefinition } from '../../types';

export const voltnTechnologyDefinition = {
	id: "voltn",
	name: "Voltn",
	website: "https://voltn.agency",
	description: "Voltn is a marketing technology services provider.",
	icon: "Voltn.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "voltn:dom:0",
			kind: "dom",
			selector: "link[href*='//pixel.voltn.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
