import type { TechnologyDefinition } from '../../types';

export const andersnorenHitchcockTechnologyDefinition = {
	id: "andersnoren-hitchcock",
	name: "AndersNoren Hitchcock",
	website: "https://andersnoren.se/teman/hitchcock-wordpress-theme",
	description: "AndersNoren Hitchcock is a portfolio WordPress theme for designers, photographers and other creatives.",
	icon: "AndersNoren.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "andersnoren-hitchcock:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/hitchcock\\/"),
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
