import type { TechnologyDefinition } from '../../types';

export const dimpleTechnologyDefinition = {
	id: "dimple",
	name: "dimple",
	website: "http://dimplejs.org/",
	description: "dimple.js is a powerful and flexible open-source charting API for d3 letting you quickly and easily create and combine bar, line, area and scatter charts.",
	categories: [
		"graphics-visualization",
		"widgets-misc",
	],
	rules: [
		{
			id: "dimple:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("dimple(?:\\/lib\\/[\\w\\.]+)?(?:\\/theme\\/js\\/[\\w\\.-]+)?\\.js(?:\\?ver=((?:\\d+\\.)+\\d+))?"),
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
	requires: [
		"d3",
	],
} as const satisfies TechnologyDefinition;
