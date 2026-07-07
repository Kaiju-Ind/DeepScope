import type { TechnologyDefinition } from '../../types';

export const feedifyTechnologyDefinition = {
	id: "feedify",
	name: "Feedify",
	website: "https://feedify.net",
	description: "Feedify is a platform that offers a lean dashboard for managing customer engagement tools with automation.",
	icon: "Feedify.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "feedify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.feedify\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "feedify:jsGlobal:1",
			kind: "jsGlobal",
			property: "feedify",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "feedify:jsGlobal:2",
			kind: "jsGlobal",
			property: "feedify_options",
			description: "Page-owned global matches a known technology marker.",
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
