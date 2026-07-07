import type { TechnologyDefinition } from '../../types';

export const dividoTechnologyDefinition = {
	id: "divido",
	name: "Divido",
	website: "https://www.divido.com/",
	description: "Divio is a Buy now pay later solution. Divido provided whitelabel platform connects lenders, retailers and channel partners at the point of sale",
	icon: "Divido.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "divido:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.divido\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
