import type { TechnologyDefinition } from '../../types';

export const myplayTechnologyDefinition = {
	id: "myplay",
	name: "MyPlay",
	website: "https://www.myplay.com",
	description: "MyPlay is a network of Sony Music–owned online stores that enable musicians to sell and distribute their music and related merchandise.",
	icon: "MyPlay.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "myplay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.myplay\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
