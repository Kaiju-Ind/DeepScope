import type { TechnologyDefinition } from '../../types';

export const accertifyTechnologyDefinition = {
	id: "accertify",
	name: "Accertify",
	website: "https://www.accertify.com/",
	description: "Accertify is a platform specialising in fraud prevention and chargeback management.",
	icon: "Accertify.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "accertify:dom:0",
			kind: "dom",
			selector: "div[id*='Accertify']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
