import type { TechnologyDefinition } from '../../types';

export const zarlaTechnologyDefinition = {
	id: "zarla",
	name: "Zarla",
	website: "https://www.zarla.com",
	description: "Zarla is a website builder designed for small businesses, offering SEO optimization features to improve online visibility.",
	icon: "Zarla.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "zarla:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.zarlasites\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
