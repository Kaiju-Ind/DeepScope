import type { TechnologyDefinition } from '../../types';

export const sonobiTechnologyDefinition = {
	id: "sonobi",
	name: "Sonobi",
	website: "https://sonobi.com",
	description: "Sonobi is an ad technology developer that designs advertising tools and solutions for the media publishers, brand advertisers and media agencies.",
	icon: "Sonobi.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "sonobi:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("apex\\.go\\.sonobi\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
