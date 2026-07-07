import type { TechnologyDefinition } from '../../types';

export const wowTechnologyDefinition = {
	id: "wow",
	name: "WOW",
	website: "https://www.delac.io/WOW",
	description: "Reveal CSS animation as you scroll down a page.",
	categories: [
		"ui-library",
		"framework",
		"graphics-visualization",
	],
	rules: [
		{
			id: "wow:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("wow(?:\\.min)?\\.js(?:\\?ver=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"low",
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
