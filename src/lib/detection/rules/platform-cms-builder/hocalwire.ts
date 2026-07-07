import type { TechnologyDefinition } from '../../types';

export const hocalwireTechnologyDefinition = {
	id: "hocalwire",
	name: "Hocalwire",
	website: "https://www.hocalwire.com",
	description: "Hocalwire is a simplified newsroom CMS platform focused on Digital Media Publishers.",
	icon: "Hocalwire.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "hocalwire:dom:0",
			kind: "dom",
			selector: "link[href*='//hocalwire.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "hocalwire:jsGlobal:1",
			kind: "jsGlobal",
			property: "Hocalwire",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hocalwire:jsGlobal:2",
			kind: "jsGlobal",
			property: "hocalApiEndPoints",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
