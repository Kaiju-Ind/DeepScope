import type { TechnologyDefinition } from '../../types';

export const rockeeTechnologyDefinition = {
	id: "rockee",
	name: "Rockee",
	website: "https://rockee.io",
	description: "Rockee is a content feedback and performance platform that provides insights into audience perceptions of content.",
	icon: "Rockee.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "rockee:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.rockee\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
