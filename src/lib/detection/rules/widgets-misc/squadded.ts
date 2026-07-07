import type { TechnologyDefinition } from '../../types';

export const squaddedTechnologyDefinition = {
	id: "squadded",
	name: "Squadded",
	website: "https://www.squadded.co",
	description: "Squadded is a social ecommerce solution that allows visitors to shop together with their friends and with other members of the brands online community.",
	icon: "Squadded.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "squadded:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.squadded\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
	implies: [
		"cart-functionality",
	],
} as const satisfies TechnologyDefinition;
