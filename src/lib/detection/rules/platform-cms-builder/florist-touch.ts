import type { TechnologyDefinition } from '../../types';

export const floristTouchTechnologyDefinition = {
	id: "florist-touch",
	name: "Florist Touch",
	website: "https://floristtouch.co.uk/",
	description: "Florist Touch is an all-in-one solution for home, studio, and shop florists, providing tools and resources for floral arrangements and business management.",
	icon: "FloristTouch.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "florist-touch:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.floristtouch\\.co\\.uk\\/"),
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
