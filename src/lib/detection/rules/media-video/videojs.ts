import type { TechnologyDefinition } from '../../types';

export const videojsTechnologyDefinition = {
	id: "videojs",
	name: "VideoJS",
	website: "https://videojs.com",
	description: "Video.js is a JavaScript and CSS library that makes it easier to work with and build on HTML5 video.",
	icon: "VideoJS.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "videojs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("zencdn\\.net\\/c\\/video\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "videojs:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("cdnjs\\.cloudflare\\.com\\/ajax\\/libs\\/video\\.js\\/([\\d\\.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "videojs:stylesheetContent:2",
			kind: "stylesheetContent",
			pattern: new RegExp("\\.video-js"),
			confidence: 25,
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "videojs:stylesheetContent:3",
			kind: "stylesheetContent",
			pattern: new RegExp("\\.vjs-big-play-button"),
			confidence: 75,
			description: "Stylesheet content contains a bounded technology signature.",
		},
		{
			id: "videojs:dom:4",
			kind: "dom",
			selector: "div.video-js",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "videojs:jsGlobal:5",
			kind: "jsGlobal",
			property: "VideoJS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "videojs:jsGlobal:6",
			kind: "jsGlobal",
			property: "videojs",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "videojs:jsGlobal:7",
			kind: "jsGlobal",
			property: "videojs.VERSION",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
