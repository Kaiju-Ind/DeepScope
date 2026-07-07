import type { TechnologyDefinition } from '../../types';

export const monkcommerceTechnologyDefinition = {
	id: "monkcommerce",
	name: "Monkcommerce",
	website: "https://monkcommerce.com/",
	description: "Monk Commerce is a software-as-a-service that aims to increase income for small e-commerce businesses by deploying AOV boosting techniques like cart and post-purchase offers",
	icon: "Monk.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "monkcommerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.monkcommerce\\.app"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
