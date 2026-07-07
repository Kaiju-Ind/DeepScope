import type { TechnologyDefinition } from '../../types';

export const mediaelementJsTechnologyDefinition = {
	id: "mediaelement-js",
	name: "MediaElement.js",
	website: "https://www.mediaelementjs.com",
	description: "MediaElement.js is a set of custom Flash plugins that mimic the HTML5 MediaElement API for browsers that don't support HTML5 or don't support the media codecs.",
	icon: "MediaElement.js.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "mediaelement-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "mejs",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mediaelement-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "mejs.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
