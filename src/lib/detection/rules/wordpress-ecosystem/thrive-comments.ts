import type { TechnologyDefinition } from '../../types';

export const thriveCommentsTechnologyDefinition = {
	id: "thrive-comments",
	name: "Thrive Comments",
	website: "https://thrivethemes.com/comments/",
	description: "Thrive Comments plugin replaces the standard WordPress comments from your website.",
	icon: "Thrive.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "thrive-comments:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/thrive-comments\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "thrive-comments:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/thrive-comments/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:thrivethemes:thrive_comments:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
