import type { TechnologyDefinition } from '../../types';

export const interredTechnologyDefinition = {
	id: "interred",
	name: "InterRed",
	website: "https://www.interred.de",
	description: "InterRed is a software platform that provides integrated, future-proof publishing solutions for digital and print media management.",
	icon: "InterRed.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "interred:dom:0",
			kind: "dom",
			selector: "div[id*='footer__interred'] > a[href*='www.interred.de']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "interred:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^InterRed", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "interred:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^interred", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
