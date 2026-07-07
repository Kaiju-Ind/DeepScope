import type { TechnologyDefinition } from '../../types';

export const fullpageJsTechnologyDefinition = {
	id: "fullpage-js",
	name: "fullPage.js",
	website: "https://github.com/alvarotrigo/fullpage.js",
	description: "fullPage.js a jQuery and vanilla JavaScript plugin for fullscreen scrolling websites.",
	icon: "fullPage.js.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "fullpage-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/fullPage\\.js(?:\\/([\\d\\.]+)\\/)?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fullpage-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "fullpage_api.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fullpage-js:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/fullpage\\.js(?:\\/([\\d\\.]+)\\/)?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
