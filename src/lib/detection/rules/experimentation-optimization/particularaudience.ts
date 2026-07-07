import type { TechnologyDefinition } from '../../types';

export const particularaudienceTechnologyDefinition = {
	id: "particularaudience",
	name: "ParticularAudience",
	website: "https://particularaudience.com",
	description: "ParticularAudience is a platform utilizing AI for item-based personalization services, emphasizing privacy in a connected commerce landscape to enhance revenue streams.",
	icon: "ParticularAudience.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "particularaudience:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.particularaudience\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
