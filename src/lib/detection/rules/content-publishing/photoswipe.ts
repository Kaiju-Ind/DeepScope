import type { TechnologyDefinition } from '../../types';

export const photoswipeTechnologyDefinition = {
	id: "photoswipe",
	name: "PhotoSwipe",
	website: "https://photoswipe.com",
	description: "PhotoSwipe is an open-source gallery to support JavaScript-based image zooming.",
	icon: "PhotoSwipe.png",
	categories: [
		"content-publishing",
		"widgets-misc",
	],
	rules: [
		{
			id: "photoswipe:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("photoswipe\\/([\\d\\.]+)\\/photoswipe\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "photoswipe:jsGlobal:1",
			kind: "jsGlobal",
			property: "PhotoSwipe",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "photoswipe:jsGlobal:2",
			kind: "jsGlobal",
			property: "PhotoSwipeUI_Default",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "photoswipe:jsGlobal:3",
			kind: "jsGlobal",
			property: "photoswipeParseHash",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
