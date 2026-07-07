import type { TechnologyDefinition } from '../../types';

export const select2TechnologyDefinition = {
	id: "select2",
	name: "Select2",
	website: "https://select2.org/",
	description: "Select2 is a jQuery based replacement for select boxes. It supports searching, remote data sets, and infinite scrolling of results.",
	icon: "Select2.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "select2:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("select2(?:\\.min|\\.full)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "select2:jsGlobal:1",
			kind: "jsGlobal",
			property: "jQuery.fn.select2",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:select2:select2:*:*:*:*:*:*:*:*",
	},
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
