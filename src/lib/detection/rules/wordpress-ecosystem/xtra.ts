import type { TechnologyDefinition } from '../../types';

export const xtraTechnologyDefinition = {
	id: "xtra",
	name: "Xtra",
	website: "https://xtratheme.com",
	description: "Xtra is a creative, responsive, live drag and drop and easy-to-use WordPress theme for any kind of websites.",
	icon: "Xtra.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "xtra:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/xtra\\/.+custom\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "xtra:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/xtra/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
