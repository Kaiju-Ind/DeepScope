import type { TechnologyDefinition } from '../../types';

export const linguiseTechnologyDefinition = {
	id: "linguise",
	name: "Linguise",
	website: "https://www.linguise.com",
	description: "Linguise is an automatic translation service with a front-end translation editor.",
	icon: "Linguise.svg",
	categories: [
		"translations",
	],
	rules: [
		{
			id: "linguise:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/modules\\/mod_linguise\\/assets\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "linguise:dom:1",
			kind: "dom",
			selector: "script[type='linguise/json']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "linguise:jsGlobal:2",
			kind: "jsGlobal",
			property: "linguise_configs",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "linguise:dom:3",
			kind: "dom",
			selector: "script[type='linguise/json]",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
