import type { TechnologyDefinition } from '../../types';

export const thriveApprenticeTechnologyDefinition = {
	id: "thrive-apprentice",
	name: "Thrive Apprentice",
	website: "https://thrivethemes.com/apprentice/",
	description: "Thrive Apprentice is a WordPress plugin for creating online courses and also a membership plugin.",
	icon: "Thrive.svg",
	categories: [
		"wordpress-ecosystem",
		"content-publishing",
	],
	rules: [
		{
			id: "thrive-apprentice:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/thrive-apprentice\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "thrive-apprentice:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/thrive-apprentice/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:thrivethemes:thrive_apprentice:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
