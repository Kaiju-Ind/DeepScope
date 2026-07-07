import type { TechnologyDefinition } from '../../types';

export const pagelayerTechnologyDefinition = {
	id: "pagelayer",
	name: "PageLayer",
	website: "https://wordpress.org/plugins/pagelayer",
	description: "Drag and drop page builder for Wordpress.",
	icon: "PageLayer.png",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "pagelayer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pagelayer(?:-frontend)?(?:\\/js)?(?:\\/combined)?(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pagelayer:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/pagelayer/'], #pagelayer-frontend-css, #pagelayer-global-styles, .pagelayer-body, .pagelayer-header, .pagelayer-footer, .pagelayer-content",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
