import type { TechnologyDefinition } from '../../types';

export const isotopeTechnologyDefinition = {
	id: "isotope",
	name: "Isotope",
	website: "https://isotope.metafizzy.co",
	description: "Isotope.js is a JavaScript library that makes it easy to sort, filter, and add Masonry layouts to items on a webpage.",
	icon: "Isotope.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "isotope:jsGlobal:0",
			kind: "jsGlobal",
			property: "Isotope",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "isotope:jsGlobal:1",
			kind: "jsGlobal",
			property: "init_isotope",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
			"low",
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
