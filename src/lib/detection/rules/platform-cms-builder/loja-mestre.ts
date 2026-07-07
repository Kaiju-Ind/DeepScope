import type { TechnologyDefinition } from '../../types';

export const lojaMestreTechnologyDefinition = {
	id: "loja-mestre",
	name: "Loja Mestre",
	website: "https://www.lojamestre.com.br/",
	description: "Loja Mestre is an all-in-one ecommerce platform from Brazil.",
	icon: "Loja Mestre.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "loja-mestre:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("lojamestre\\.\\w+\\.br"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "loja-mestre:meta:1",
			kind: "meta",
			key: "webmaster",
			valuePattern: new RegExp("www\\.lojamestre\\.\\w+\\.br", "i"),
			description: "Meta tag matches a known technology marker.",
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
