import type { TechnologyDefinition } from '../../types';

export const mathJsTechnologyDefinition = {
	id: "math-js",
	name: "math.js",
	website: "https://mathjs.org",
	description: "Math.js a JavaScript library that provides a comprehensive set of mathematical functions and capabilities for performing complex calculations and operations in web applications.",
	icon: "math.js.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "math-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("math(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "math-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "mathjs",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:mathjs:math.js:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
