import type { TechnologyDefinition } from '../../types';

export const bootboxJsTechnologyDefinition = {
	id: "bootbox-js",
	name: "Bootbox.js",
	website: "https://bootboxjs.com/",
	description: "Bootbox.js is a small JavaScript library which allows you to create custom modal dialogs using Bootstrap modals, without having to worry about creating, managing, or removing any of the required DOM elements or JavaScript event handlers.",
	icon: "Bootbox.js.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "bootbox-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/)?bootbox(?:\\.min)?\\.js"),
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
