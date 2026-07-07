import type { TechnologyDefinition } from '../../types';

export const tipsoTechnologyDefinition = {
	id: "tipso",
	name: "Tipso",
	website: "https://tipso.object505.com",
	description: "Tipso is a lightweight, responsive jQuery plugin designed to display customizable tooltips across devices and screen sizes.",
	icon: "Tipso.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "tipso:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/js\\/tipso\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tipso:jsGlobal:1",
			kind: "jsGlobal",
			property: "tipsoData.background",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
