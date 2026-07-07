import type { TechnologyDefinition } from '../../types';

export const junipTechnologyDefinition = {
	id: "junip",
	name: "Junip",
	website: "https://junip.co",
	description: "Junip provider of an ecommerce brand review platform designed to share customers' story, send review requests and display review content.",
	icon: "Junip.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "junip:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.juniphq\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "junip:jsGlobal:1",
			kind: "jsGlobal",
			property: "junipLoaded",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "junip:jsGlobal:2",
			kind: "jsGlobal",
			property: "webpackChunkjunip_scripts",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
