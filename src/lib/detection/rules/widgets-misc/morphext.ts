import type { TechnologyDefinition } from '../../types';

export const morphextTechnologyDefinition = {
	id: "morphext",
	name: "Morphext",
	website: "https://morphext.fyianlai.com/",
	description: "Morphext is a lightweight jQuery plugin that rotates text using Animate.css transitions for smooth, dynamic visual effects.",
	icon: "Morphext.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "morphext:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("morphext(?:\\.min)?\\.js(?:\\?ver=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "morphext:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/js\\/morphext\\/morphext\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
