import type { TechnologyDefinition } from '../../types';

export const seedprodComingSoonTechnologyDefinition = {
	id: "seedprod-coming-soon",
	name: "SeedProd Coming Soon",
	website: "https://www.seedprod.com/features/coming-soon-page-templates-for-wordpress",
	description: "SeedProd Coming Soon is a page builder allows you to add a new website under construction page to your WordPress site without hiring a developer.",
	icon: "SeedProd.svg",
	categories: [
		"wordpress-ecosystem",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "seedprod-coming-soon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/coming-soon\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "seedprod-coming-soon:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/coming-soon/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
