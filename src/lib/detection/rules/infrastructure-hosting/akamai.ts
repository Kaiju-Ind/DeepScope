import type { TechnologyDefinition } from '../../types';

export const akamaiTechnologyDefinition = {
	id: "akamai",
	name: "Akamai",
	website: "https://akamai.com",
	description: "Akamai is global content delivery network (CDN) services provider for media and software delivery, and cloud security solutions.",
	icon: "Akamai.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
