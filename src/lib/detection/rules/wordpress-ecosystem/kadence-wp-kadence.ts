import type { TechnologyDefinition } from '../../types';

export const kadenceWpKadenceTechnologyDefinition = {
	id: "kadence-wp-kadence",
	name: "Kadence WP Kadence",
	website: "https://www.kadencewp.com/kadence-theme",
	description: "Kadence WP Kadence is a multipurpose WordPress theme that is available for free download and also offers a pro version.",
	icon: "Kadence WP.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "kadence-wp-kadence:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/kadence\\/.+navigation\\.min\\.js(?:\\?ver=([\\d\\.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kadence-wp-kadence:dom:1",
			kind: "dom",
			selector: "link#kadence-global-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "kadence-wp-kadence:jsGlobal:2",
			kind: "jsGlobal",
			property: "kadence",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kadence-wp-kadence:jsGlobal:3",
			kind: "jsGlobal",
			property: "kadenceConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"mid",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
