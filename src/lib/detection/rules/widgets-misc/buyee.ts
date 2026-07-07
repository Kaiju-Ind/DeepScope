import type { TechnologyDefinition } from '../../types';

export const buyeeTechnologyDefinition = {
	id: "buyee",
	name: "Buyee",
	website: "https://buyee.jp",
	description: "Buyee is a widget that facilitates purchasing products from Japan.",
	icon: "Buyee.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "buyee:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.buyee\\.jp"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
