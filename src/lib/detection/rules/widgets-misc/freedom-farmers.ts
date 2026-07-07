import type { TechnologyDefinition } from '../../types';

export const freedomFarmersTechnologyDefinition = {
	id: "freedom-farmers",
	name: "Freedom Farmers",
	website: "https://freedomfarmers.com",
	description: "Freedom Farmers is a micro farm platform designed for individuals interested in growing food, starting an agricultural business, or gaining access to land.",
	icon: "FreedomFarmers.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "freedom-farmers:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\/\\/freedomfarmers\\.com"),
			description: "Script content contains a bounded technology signature.",
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
