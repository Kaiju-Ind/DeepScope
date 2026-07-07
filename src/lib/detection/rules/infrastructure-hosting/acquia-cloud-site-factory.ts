import type { TechnologyDefinition } from '../../types';

export const acquiaCloudSiteFactoryTechnologyDefinition = {
	id: "acquia-cloud-site-factory",
	name: "Acquia Cloud Site Factory",
	website: "https://www.acquia.com/products/drupal-cloud/site-factory",
	description: "Acquia Site Factory is a multisite platform for Drupal.",
	icon: "acquia-site-factory.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "acquia-cloud-site-factory:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sites\\/g\\/files"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "acquia-cloud-site-factory:dom:1",
			kind: "dom",
			selector: "script[src*='sites/g/files']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "acquia-cloud-site-factory:dom:2",
			kind: "dom",
			selector: "img[src*='sites/g/files']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "acquia-cloud-site-factory:dom:3",
			kind: "dom",
			selector: "img[data-src*='sites/g/files']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "acquia-cloud-site-factory:dom:4",
			kind: "dom",
			selector: "link[href*='sites/g/files']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	implies: [
		"acquia-cloud-platform",
		"drupal-multisite",
	],
} as const satisfies TechnologyDefinition;
