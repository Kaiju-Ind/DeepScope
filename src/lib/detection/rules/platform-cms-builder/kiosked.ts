import type { TechnologyDefinition } from '../../types';

export const kioskedTechnologyDefinition = {
	id: "kiosked",
	name: "Kiosked",
	website: "https://www.kiosked.com",
	description: "Kiosked is a platform that converts online content, including images, videos, and applications, into interactive digital storefronts.",
	icon: "Kiosked.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kiosked:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("scripts\\.kiosked\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
