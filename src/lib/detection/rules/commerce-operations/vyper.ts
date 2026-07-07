import type { TechnologyDefinition } from '../../types';

export const vyperTechnologyDefinition = {
	id: "vyper",
	name: "Vyper",
	website: "https://vyper.io",
	description: "Vyper is a system for creating and managing giveaways or viral contests to increase engagement and reach.",
	icon: "Vyper.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "vyper:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("vyper\\.io"),
			description: "Script content contains a bounded technology signature.",
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
