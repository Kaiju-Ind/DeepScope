import type { TechnologyDefinition } from '../../types';

export const thimpressLearnpressTechnologyDefinition = {
	id: "thimpress-learnpress",
	name: "ThimPress LearnPress",
	website: "https://wordpress.org/plugins/learnpress",
	description: "LearnPress is a WordPress LMS plugin by ThimPress.",
	icon: "ThimPress.svg",
	categories: [
		"wordpress-ecosystem",
		"content-publishing",
	],
	rules: [
		{
			id: "thimpress-learnpress:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/learnpress\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "thimpress-learnpress:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/learnpress/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
