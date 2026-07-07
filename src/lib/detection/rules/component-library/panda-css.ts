import type { TechnologyDefinition } from '../../types';

export const pandaCssTechnologyDefinition = {
	id: "panda-css",
	name: "Panda CSS",
	website: "https://panda-css.com/",
	description: "Panda is a styling engine that generates styling primitives to author atomic CSS and recipes in a type-safe and readable manner.",
	icon: "PandaCSS.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "panda-css:stylesheetContent:0",
			kind: "stylesheetContent",
			pattern: new RegExp("--made-with-panda"),
			description: "Stylesheet content contains a bounded technology signature.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
