import type { TechnologyDefinition } from '../../types';

export const mithrilTechnologyDefinition = {
	id: "mithril",
	name: "Mithril",
	website: "https://mithril.js.org/",
	description: "A Javascript Framework for building applications.",
	icon: "Mithril.svg",
	categories: [
		"ui-library",
		"widgets-misc",
	],
	rules: [
		{
			id: "mithril:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("mithril(?:[\\.-]min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mithril:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/)?mithril(?:[\\.-]min)?\\.js"),
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
