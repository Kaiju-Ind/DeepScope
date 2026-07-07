import type { TechnologyDefinition } from '../../types';

export const iwikiTechnologyDefinition = {
	id: "iwiki",
	name: "iWiki",
	website: "https://www.iwink.nl",
	description: "iWiki is a Dutch-based content management system provider, formerly known as Kirra.",
	icon: "iWink.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "iwiki:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.kirra\\.nl"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "iwiki:jsGlobal:1",
			kind: "jsGlobal",
			property: "Kirra",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "iwiki:jsGlobal:2",
			kind: "jsGlobal",
			property: "KirraActiveMenuItems",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
