import type { TechnologyDefinition } from '../../types';

export const formstoneTechnologyDefinition = {
	id: "formstone",
	name: "Formstone",
	website: "https://formstone.it",
	description: "Formstone is a front-end library that simplifies web development by providing customizable jQuery plugins that abstract modern web patterns.",
	icon: "Formstone.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "formstone:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("jquery\\.formstone\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"onetime",
		],
		cpe: "cpe:2.3:a:formstone:formstone:*:*:*:*:*:*:*:*",
	},
	requires: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
