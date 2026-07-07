import type { TechnologyDefinition } from '../../types';

export const mintedTechnologyDefinition = {
	id: "minted",
	name: "Minted",
	website: "https://www.minted.com",
	description: "Minted is a marketplace that offers premium design goods created by independent artists and designers.",
	icon: "Minted.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "minted:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.minted\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
