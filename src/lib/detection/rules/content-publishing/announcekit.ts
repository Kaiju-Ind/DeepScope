import type { TechnologyDefinition } from '../../types';

export const announcekitTechnologyDefinition = {
	id: "announcekit",
	name: "AnnounceKit",
	website: "https://announcekit.app",
	description: "AnnounceKit is a platform facilitating announcements for product updates and company news.",
	icon: "AnnounceKit.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "announcekit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.announcekit\\.app\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "announcekit:jsGlobal:1",
			kind: "jsGlobal",
			property: "announcekit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "announcekit:jsGlobal:2",
			kind: "jsGlobal",
			property: "announcekit_feed",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
