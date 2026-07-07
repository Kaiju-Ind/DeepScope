import type { TechnologyDefinition } from '../../types';

export const plyrTechnologyDefinition = {
	id: "plyr",
	name: "Plyr",
	website: "https://plyr.io",
	description: "Plyr is a simple, lightweight, accessible and customizable HTML5, YouTube and Vimeo media player that supports modern browsers.",
	icon: "Plyr.png",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "plyr:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.plyr\\.io\\/([0-9.]+)\\/.+\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "plyr:stylesheetContent:1",
			kind: "stylesheetContent",
			pattern: new RegExp("--plyr-progress"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "plyr:jsGlobal:2",
			kind: "jsGlobal",
			property: "Plyr",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
