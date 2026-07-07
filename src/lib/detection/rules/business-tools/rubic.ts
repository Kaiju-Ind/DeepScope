import type { TechnologyDefinition } from '../../types';

export const rubicTechnologyDefinition = {
	id: "rubic",
	name: "Rubic",
	website: "https://rubic.no",
	description: "Rubic is an association management software designed to support organizations in handling membership, events, and administrative tasks.",
	icon: "Rubic.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "rubic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.rubic\\.no"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rubic:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("app\\.rubic\\.no"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
