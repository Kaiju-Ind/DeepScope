import type { TechnologyDefinition } from '../../types';

export const tallyTechnologyDefinition = {
	id: "tally",
	name: "Tally",
	website: "https://tally.so/",
	description: "Tally is the simplest way to create free forms & surveys. Create any type of form in seconds, without knowing how to code, and for free.",
	icon: "Tally.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "tally:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/tally\\.so\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tally:dom:1",
			kind: "dom",
			selector: "iframe[data-tally-src^='https://tally.so/embed/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "tally:dom:2",
			kind: "dom",
			selector: "a[href*='//tally.so/r/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "tally:jsGlobal:3",
			kind: "jsGlobal",
			property: "Tally",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
