import type { TechnologyDefinition } from '../../types';

export const coreFrameworkTechnologyDefinition = {
	id: "core-framework",
	name: "Core Framework",
	website: "https://coreframework.com",
	description: "Core Framework is a visual CSS framework for WordPress and other platforms.",
	icon: "CoreFramework.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "core-framework:dom:0",
			kind: "dom",
			selector: "link#core-framework-frontend-css, style#core-framework-inline-inline-css",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
