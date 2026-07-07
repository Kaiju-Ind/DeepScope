import type { TechnologyDefinition } from '../../types';

export const intiaroTechnologyDefinition = {
	id: "intiaro",
	name: "Intiaro",
	website: "https://en.intiaro.com",
	description: "Intiaro is a provider of home decor and furniture products designed to support the creation of stylish living spaces.",
	icon: "Intiaro.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "intiaro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("libs\\.intiaro\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
