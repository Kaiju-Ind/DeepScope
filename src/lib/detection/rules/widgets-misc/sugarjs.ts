import type { TechnologyDefinition } from '../../types';

export const sugarjsTechnologyDefinition = {
	id: "sugarjs",
	name: "SugarJS",
	website: "https://sugarjs.com/",
	description: "SugarJS is a JavaScript library that simplifies working with native JavaScript objects, enhancing productivity and code readability.",
	icon: "SugarJS.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "sugarjs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sugar\\/?((?:\\d+\\.)+\\d+)?(?:\\/sugar(?:-full)?)?(?:\\.min)?\\.js"),
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
