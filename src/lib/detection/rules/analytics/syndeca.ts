import type { TechnologyDefinition } from '../../types';

export const syndecaTechnologyDefinition = {
	id: "syndeca",
	name: "Syndeca",
	website: "https://www.syndeca.com",
	description: "Syndeca is a visual commerce platform that allows brands to quickly create engaging, actionable campaigns.",
	icon: "Syndeca.svg",
	categories: [
		"analytics",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "syndeca:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.syndeca\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "syndeca:jsGlobal:1",
			kind: "jsGlobal",
			property: "SyndecaAnalyticsObject",
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
