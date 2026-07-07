import type { TechnologyDefinition } from '../../types';

export const coffeeScriptTechnologyDefinition = {
	id: "coffee-script",
	name: "Coffee Script",
	website: "https://coffeescript.org/",
	description: "CoffeeScript is a language that compiles into JavaScript.",
	icon: "Coffee Script.png",
	categories: [
		"ui-library",
		"widgets-misc",
	],
	rules: [
		{
			id: "coffee-script:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("coffee-?script(?:-lint)?(?:\\.min)?\\.js(?:\\?ver=((?:\\d+\\.)+\\d+))?"),
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
