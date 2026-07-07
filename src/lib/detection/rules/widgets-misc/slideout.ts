import type { TechnologyDefinition } from '../../types';

export const slideoutTechnologyDefinition = {
	id: "slideout",
	name: "slideout",
	website: "https://slideout.js.org/",
	description: "A touch slideout navigation menu for your mobile web apps.",
	icon: "slideout.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "slideout:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("slideout(?:-init)?(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "slideout:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/)?slideout(?:-init)?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "slideout:jsGlobal:2",
			kind: "jsGlobal",
			property: "slideout",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
