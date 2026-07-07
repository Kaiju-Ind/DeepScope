import type { TechnologyDefinition } from '../../types';

export const acquiaCloudIdeTechnologyDefinition = {
	id: "acquia-cloud-ide",
	name: "Acquia Cloud IDE",
	website: "https://www.acquia.com/products/drupal-cloud/cloud-ide",
	description: "Acquia Cloud IDE is a browser-based source code editor and a Drupal development stack running on the Acquia Cloud Platform.",
	icon: "acquia-cloud-ide.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "acquia-cloud-ide:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("https?:\\/\\/.+\\.web\\.ahdev\\.cloud"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "acquia-cloud-ide:url:1",
			kind: "url",
			pattern: new RegExp("https:?\\/\\/.+\\.web\\.ahdev\\.cloud"),
			description: "Page URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	implies: [
		"acquia-cloud-platform",
	],
} as const satisfies TechnologyDefinition;
