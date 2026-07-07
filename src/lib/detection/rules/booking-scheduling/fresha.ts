import type { TechnologyDefinition } from '../../types';

export const freshaTechnologyDefinition = {
	id: "fresha",
	name: "Fresha",
	website: "https://www.fresha.com",
	description: "Fresha is a leading marketplace enabling consumers to discover, book, and pay for local beauty and wellness services.",
	icon: "Fresha.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "fresha:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.fresha\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fresha:dom:1",
			kind: "dom",
			selector: "a[data-href*='.fresha.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "fresha:jsGlobal:2",
			kind: "jsGlobal",
			property: "FRESHA_VARS",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
