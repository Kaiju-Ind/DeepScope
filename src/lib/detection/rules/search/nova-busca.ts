import type { TechnologyDefinition } from '../../types';

export const novaBuscaTechnologyDefinition = {
	id: "nova-busca",
	name: "Nova Busca",
	website: "https://novabusca.com.br",
	description: "Nova Busca is an artificial intelligence tool that enhances search functionality on ecommerce websites by improving result relevance and user experience.",
	icon: "NovaBusca.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "nova-busca:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.novabusca\\.com\\.br"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
