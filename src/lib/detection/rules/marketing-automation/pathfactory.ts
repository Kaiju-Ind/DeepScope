import type { TechnologyDefinition } from '../../types';

export const pathfactoryTechnologyDefinition = {
	id: "pathfactory",
	name: "PathFactory",
	website: "https://www.pathfactory.com",
	description: "PathFactory is a platform utilizing AI to align content with revenue generation.",
	icon: "PathFactory.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "pathfactory:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn-app\\.pathfactory\\.com"),
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
