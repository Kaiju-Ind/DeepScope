import type { TechnologyDefinition } from '../../types';

export const milotreeTechnologyDefinition = {
	id: "milotree",
	name: "MiloTree",
	website: "https://milotree.com",
	description: "MiloTree is a pop-up tool that helps websites grow by converting visitors into social media followers and customers.",
	icon: "MiloTree.svg",
	categories: [
		"widgets-misc",
		"marketing-automation",
	],
	rules: [
		{
			id: "milotree:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn001\\.milotree\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "milotree:jsGlobal:1",
			kind: "jsGlobal",
			property: "milotree_closeBox",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "milotree:jsGlobal:2",
			kind: "jsGlobal",
			property: "milotree_openBox",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "milotree:meta:3",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^milotree", "i"),
			description: "Meta tag matches a known technology marker.",
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
