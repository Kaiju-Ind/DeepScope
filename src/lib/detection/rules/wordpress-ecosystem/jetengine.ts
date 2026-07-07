import type { TechnologyDefinition } from '../../types';

export const jetengineTechnologyDefinition = {
	id: "jetengine",
	name: "JetEngine",
	website: "https://crocoblock.com/plugins/jetengine",
	description: "JetEngine is a content plugin for WordPress that allows users to create custom post types, taxonomies, and meta boxes, offering flexibility in building complex websites without requiring coding skills.",
	icon: "JetEngine.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "jetengine:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/jet-engine\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"onetime",
			"recurring",
		],
		cpe: "cpe:2.3:a:crocoblock:jetengine:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
