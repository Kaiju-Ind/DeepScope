import type { TechnologyDefinition } from '../../types';

export const acquiaCustomerDataPlatformTechnologyDefinition = {
	id: "acquia-customer-data-platform",
	name: "Acquia Customer Data Platform",
	website: "https://www.acquia.com/products/marketing-cloud/customer-data-platform",
	description: "Acquia Customer Data Platform (formerly AgilOne) is a customer data platform for Drupal.",
	icon: "acquia-cdp.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "acquia-customer-data-platform:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^https?:\\/\\/.+\\.agilone\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "acquia-customer-data-platform:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("^https?:\\/\\/scripts\\.agilone\\.com\\/latest\\/a1.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "acquia-customer-data-platform:dom:2",
			kind: "dom",
			selector: "[data-function*='Agilone']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "acquia-customer-data-platform:jsGlobal:3",
			kind: "jsGlobal",
			property: "$A1",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "acquia-customer-data-platform:jsGlobal:4",
			kind: "jsGlobal",
			property: "$A1Config",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "acquia-customer-data-platform:jsGlobal:5",
			kind: "jsGlobal",
			property: "agiloneObject",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
