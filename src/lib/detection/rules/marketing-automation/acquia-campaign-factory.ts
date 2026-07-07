import type { TechnologyDefinition } from '../../types';

export const acquiaCampaignFactoryTechnologyDefinition = {
	id: "acquia-campaign-factory",
	name: "Acquia Campaign Factory",
	website: "https://www.acquia.com/products/marketing-cloud/campaign-factory",
	description: "Acquia Campaign Factory is centralized marketing management system powered by Mautic.",
	icon: "acquia-campaign-factory.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "acquia-campaign-factory:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("mautic\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "acquia-campaign-factory:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("maestro\\.mautic\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	implies: [
		"mautic",
	],
} as const satisfies TechnologyDefinition;
