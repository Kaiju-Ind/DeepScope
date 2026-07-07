import type { TechnologyDefinition } from '../../types';

export const buttonizerTechnologyDefinition = {
	id: "buttonizer",
	name: "Buttonizer",
	website: "https://buttonizer.pro",
	description: "Buttonizer is a widget that enables website owners to incorporate custom and attention-grabbing call-to-action (CTA) buttons into their website design.",
	icon: "Buttonizer.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "buttonizer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("wp-content\\/plugins\\/buttonizer-multifunctional-button\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "buttonizer:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.buttonizer\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "buttonizer:jsGlobal:2",
			kind: "jsGlobal",
			property: "Buttonizer",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
