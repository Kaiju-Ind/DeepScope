import type { TechnologyDefinition } from '../../types';

export const simplybookMeTechnologyDefinition = {
	id: "simplybook-me",
	name: "SimplyBook.me",
	website: "https://simplybook.me",
	description: "SimplyBook.me is an online appointment scheduling and booking software.",
	icon: "SimplyBook.me.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "simplybook-me:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.simplybook\\.(?:asia|it|me)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "simplybook-me:dom:1",
			kind: "dom",
			selector: "a[href*='.simplybook.'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "simplybook-me:jsGlobal:2",
			kind: "jsGlobal",
			property: "configSoinSimplyPush",
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
