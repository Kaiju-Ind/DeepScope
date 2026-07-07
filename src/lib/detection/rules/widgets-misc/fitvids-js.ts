import type { TechnologyDefinition } from '../../types';

export const fitvidsJsTechnologyDefinition = {
	id: "fitvids-js",
	name: "FitVids.JS",
	website: "https://fitvidsjs.com/",
	description: "jQuery plugin for fluid width video embeds",
	icon: "FitVids.JS.png",
	categories: [
		"widgets-misc",
		"media-video",
	],
	rules: [
		{
			id: "fitvids-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("fitvids(?:\\.min)?\\.js(?:\\?ver=([\\d.]+))?"),
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
} as const satisfies TechnologyDefinition;
