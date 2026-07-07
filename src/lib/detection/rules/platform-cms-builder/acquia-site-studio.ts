import type { TechnologyDefinition } from '../../types';

export const acquiaSiteStudioTechnologyDefinition = {
	id: "acquia-site-studio",
	name: "Acquia Site Studio",
	website: "https://www.acquia.com/products/drupal-cloud/site-studio",
	description: "Site Studio (formerly Cohesion) is a low-code, Drupal add-on page builder.",
	icon: "acquia-site-studio.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "acquia-site-studio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sites\\/\\w*\\/files\\/cohesion"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "acquia-site-studio:dom:1",
			kind: "dom",
			selector: "div[class*='coh-component coh-component-instance']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	implies: [
		"acquia-cloud-platform",
	],
} as const satisfies TechnologyDefinition;
