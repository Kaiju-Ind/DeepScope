import type { TechnologyDefinition } from '../../types';

export const andersnorenFukasawaTechnologyDefinition = {
	id: "andersnoren-fukasawa",
	name: "AndersNoren Fukasawa",
	website: "https://andersnoren.se/teman/fukasawa-wordpress-theme",
	description: "AndersNoren Fukasawa is a minimal masonry style blog WordPress theme for photographers and collectors.",
	icon: "AndersNoren.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "andersnoren-fukasawa:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/fukasawa\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
