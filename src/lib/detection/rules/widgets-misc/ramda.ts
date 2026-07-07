import type { TechnologyDefinition } from '../../types';

export const ramdaTechnologyDefinition = {
	id: "ramda",
	name: "Ramda",
	website: "https://ramdajs.com",
	description: "Ramda is a practical functional programming library for JavaScript that emphasizes immutability, currying, and function composition to facilitate writing more declarative and modular code.",
	icon: "Ramda.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "ramda:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ramda.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:ramdajs:ramda:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
