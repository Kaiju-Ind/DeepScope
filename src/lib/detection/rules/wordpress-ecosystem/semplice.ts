import type { TechnologyDefinition } from '../../types';

export const sempliceTechnologyDefinition = {
	id: "semplice",
	name: "Semplice",
	website: "https://www.semplice.com",
	description: "Semplice is a Wordpress-based website builder made by designers for designers.",
	icon: "Semplice.svg",
	categories: [
		"wordpress-ecosystem",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "semplice:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/semplice(?:\\d+)?(?:-child)?(?:-theme)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "semplice:jsGlobal:1",
			kind: "jsGlobal",
			property: "semplice.template_dir",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
