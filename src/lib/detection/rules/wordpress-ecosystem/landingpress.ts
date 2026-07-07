import type { TechnologyDefinition } from '../../types';

export const landingpressTechnologyDefinition = {
	id: "landingpress",
	name: "LandingPress",
	website: "https://landingpress.net",
	description: "LandingPress is a WordPress theme.",
	icon: "LandingPress.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "landingpress:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/landingpress-wp\\/.+script\\.min\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
