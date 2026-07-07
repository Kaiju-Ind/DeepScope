import type { TechnologyDefinition } from '../../types';

export const klaviyoCustomerHubTechnologyDefinition = {
	id: "klaviyo-customer-hub",
	name: "Klaviyo Customer Hub",
	website: "https://www.klaviyo.com/products/customer-experience-hub",
	description: "Klaviyo Customer Hub gives customers a unified signed-in experience to track orders, manage returns, and get help",
	icon: "Klaviyo.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "klaviyo-customer-hub:dom:0",
			kind: "dom",
			selector: "div#k-hub",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "klaviyo-customer-hub:jsGlobal:1",
			kind: "jsGlobal",
			property: "customerHub",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
