import type { TechnologyDefinition } from '../../types';

export const twicpicsTechnologyDefinition = {
	id: "twicpics",
	name: "TwicPics",
	website: "https://www.twicpics.com",
	description: "TwicPics offers on-demand responsive image generation.",
	icon: "TwicPics.svg",
	categories: [
		"infrastructure-hosting",
		"widgets-misc",
	],
	rules: [
		{
			id: "twicpics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp(".+\\.twic\\.pics"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "twicpics:dom:1",
			kind: "dom",
			selector: ".twic",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "twicpics:dom:2",
			kind: "dom",
			selector: "[data-twic-src]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "twicpics:dom:3",
			kind: "dom",
			selector: "data-twic-background",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "twicpics:header:4",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^TwicPics\\/\\d+\\.\\d+\\.\\d+$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "twicpics:header:5",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^twicpics\\/\\d+\\.\\d+\\.\\d+$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
