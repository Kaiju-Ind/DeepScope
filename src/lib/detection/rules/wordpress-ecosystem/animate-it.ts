import type { TechnologyDefinition } from '../../types';

export const animateItTechnologyDefinition = {
	id: "animate-it",
	name: "Animate It",
	website: "https://wordpress.org/plugins/animate-it/",
	description: "Animate It! adds CSS3 animations to your content.",
	icon: "Animate It.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "animate-it:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("animate-it(?:\\/assets)?(?:\\/js)?(?:\\/animo)?(?:\\/edsanimate)?(?:\\/jquery)?(?:\\/viewportchecker)?(?:\\.ba-throttle-debounce)?(?:\\.min)?(?:\\.site)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "animate-it:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/animate-it/']",
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
