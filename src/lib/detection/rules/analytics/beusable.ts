import type { TechnologyDefinition } from '../../types';

export const beusableTechnologyDefinition = {
	id: "beusable",
	name: "Beusable",
	website: "https://www.beusable.net",
	description: "Beusable is a tool that visualises site visitors' behaviour, offering insights through graphical data representations.",
	icon: "Beusable.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "beusable:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.beusable\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "beusable:jsGlobal:1",
			kind: "jsGlobal",
			property: "__beusablerumclient__",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
