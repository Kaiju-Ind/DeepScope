import type { TechnologyDefinition } from '../../types';

export const infiniteScrollTechnologyDefinition = {
	id: "infinite-scroll",
	name: "Infinite Scroll",
	website: "https://infinite-scroll.com/",
	description: "jQuery plugin for infinite scrolling.",
	icon: "Infinite Scroll.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "infinite-scroll:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("infinite-?scroll(?:\\.pkgd)?(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "infinite-scroll:jsGlobal:1",
			kind: "jsGlobal",
			property: "infinitescroll",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
