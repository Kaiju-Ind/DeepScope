import type { TechnologyDefinition } from '../../types';

export const convertcartTechnologyDefinition = {
	id: "convertcart",
	name: "Convertcart",
	website: "https://www.convertcart.com/",
	description: "ConvertCart helps online businesses deliver outstanding experiences to customers throughout their journey.",
	icon: "Convertcart.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "convertcart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.convertcart\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
