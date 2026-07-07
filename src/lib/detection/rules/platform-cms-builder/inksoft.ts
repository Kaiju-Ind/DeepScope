import type { TechnologyDefinition } from '../../types';

export const inksoftTechnologyDefinition = {
	id: "inksoft",
	name: "InkSoft",
	website: "https://www.inksoft.com",
	description: "InkSoft is a comprehensive platform offering online designer tools and ecommerce solutions tailored for printing companies.",
	icon: "InkSoft.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "inksoft:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.inksoft\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
