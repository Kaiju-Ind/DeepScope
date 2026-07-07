import type { TechnologyDefinition } from '../../types';

export const gooberTechnologyDefinition = {
	id: "goober",
	name: "Goober",
	website: "https://goober.js.org",
	description: "Goober is a minified CSS-in-JS styling solution.",
	icon: "Goober.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "goober:dom:0",
			kind: "dom",
			selector: "style#_goober",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "goober:jsGlobal:1",
			kind: "jsGlobal",
			property: "goober",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "goober:jsGlobal:2",
			kind: "jsGlobal",
			property: "gooberGlobal",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "goober:jsGlobal:3",
			kind: "jsGlobal",
			property: "gooberPrefixer",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
