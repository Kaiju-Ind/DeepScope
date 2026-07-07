import type { TechnologyDefinition } from '../../types';

export const simpleroTechnologyDefinition = {
	id: "simplero",
	name: "Simplero",
	website: "https://simplero.com",
	description: "Simplero is an all-in-one marketing software.",
	icon: "Simplero.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "simplero:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.simplero\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "simplero:dom:1",
			kind: "dom",
			selector: "a[href*='.simplero.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "simplero:jsGlobal:2",
			kind: "jsGlobal",
			property: "Simplero",
			description: "Page-owned global matches a known technology marker.",
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
