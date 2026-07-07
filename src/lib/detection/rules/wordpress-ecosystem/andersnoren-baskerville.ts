import type { TechnologyDefinition } from '../../types';

export const andersnorenBaskervilleTechnologyDefinition = {
	id: "andersnoren-baskerville",
	name: "AndersNoren Baskerville",
	website: "https://andersnoren.se/teman/baskerville-wordpress-theme",
	description: "AndersNoren Baskerville is a responsive and retina-ready masonry WordPress theme for hoarders.",
	icon: "AndersNoren.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "andersnoren-baskerville:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/baskerville(?:-2)?\\/"),
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
