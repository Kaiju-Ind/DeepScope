import type { TechnologyDefinition } from '../../types';

export const cTechnologyDefinition = {
	id: "c",
	name: "C",
	website: "https://www.open-std.org/jtc1/sc22/wg14/",
	description: "C is a general-purpose, procedural computer programming language supporting structured programming, lexical variable scope, and recursion, with a static type system.",
	icon: "C.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "c:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^C$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
