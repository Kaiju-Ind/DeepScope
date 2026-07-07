import type { TechnologyDefinition } from '../../types';

export const mochikitTechnologyDefinition = {
	id: "mochikit",
	name: "MochiKit",
	website: "https://mochi.github.io/mochikit/",
	icon: "MochiKit.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "mochikit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("MochiKit(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mochikit:jsGlobal:1",
			kind: "jsGlobal",
			property: "MochiKit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mochikit:jsGlobal:2",
			kind: "jsGlobal",
			property: "MochiKit.MochiKit.VERSION",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mochikit:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("mochikit(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
