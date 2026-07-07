import type { TechnologyDefinition } from '../../types';

export const headroomJsTechnologyDefinition = {
	id: "headroom-js",
	name: "Headroom.js",
	website: "https://wicky.nillia.ms/headroom.js/",
	description: "Headroom.js is a JS widget that allows you to react to the user's scroll. The header slides out of view when scrolling down and slides back in when scrolling up.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "headroom-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("headroom(?:\\.min)?\\.js(?:\\?ver=((?:\\d+\\.)+\\d+))?"),
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
