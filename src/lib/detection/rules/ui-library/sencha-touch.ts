import type { TechnologyDefinition } from '../../types';

export const senchaTouchTechnologyDefinition = {
	id: "sencha-touch",
	name: "Sencha Touch",
	website: "https://www.sencha.com/products/touch",
	description: "Sencha Touch is a user interface (UI) JavaScript library, or web framework, specifically built for the Mobile Web.",
	icon: "Sencha Touch.png",
	categories: [
		"ui-library",
		"mobile",
	],
	rules: [
		{
			id: "sencha-touch:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sencha-touch.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
