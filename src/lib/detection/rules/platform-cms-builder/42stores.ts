import type { TechnologyDefinition } from '../../types';

export const technology42storesTechnologyDefinition = {
	id: "42stores",
	name: "42stores",
	website: "https://www.42stores.com",
	description: "42stores is a French SaaS ecommerce solution that was established in 2008. It offers a range of features such as monitoring, customer support, and regular updates. The platform is known for its flexibility and modularity, making it possible to integrate with various ERP systems.",
	icon: "42stores.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "42stores:header:0",
			kind: "header",
			key: "Powered-By",
			valuePattern: new RegExp("^42stores$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "42stores:header:1",
			kind: "header",
			key: "powered-by",
			valuePattern: new RegExp("^42stores$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
