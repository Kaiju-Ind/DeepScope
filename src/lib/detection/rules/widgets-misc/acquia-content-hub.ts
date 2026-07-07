import type { TechnologyDefinition } from '../../types';

export const acquiaContentHubTechnologyDefinition = {
	id: "acquia-content-hub",
	name: "Acquia Content Hub",
	website: "https://www.acquia.com/products/drupal-cloud/content-hub",
	description: "Acquia Content Hub is a cloud-based, centralized content distribution and syndication service.",
	icon: "acquia-content-hub.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "acquia-content-hub:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("content-hub\\.acquia\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "acquia-content-hub:url:1",
			kind: "url",
			pattern: new RegExp("https?:\\/\\/.+\\.content-hub\\.acquia\\.com"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "acquia-content-hub:dom:2",
			kind: "dom",
			selector: "[data-lift-slot]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "acquia-content-hub:header:3",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("content-hub\\.acquia\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	implies: [
		"acquia-cloud-platform",
	],
} as const satisfies TechnologyDefinition;
