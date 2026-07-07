import type { TechnologyDefinition } from '../../types';

export const richpanelTechnologyDefinition = {
	id: "richpanel",
	name: "Richpanel",
	website: "https://www.richpanel.com",
	description: "Richpanel is a purpose-built CRM and customer support platform for ecommerce and DTC brands.",
	icon: "Richpanel.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "richpanel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.richpanel\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "richpanel:jsGlobal:1",
			kind: "jsGlobal",
			property: "Richpanel.PLUGIN_API_URL",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "richpanel:jsGlobal:2",
			kind: "jsGlobal",
			property: "RichpanelAppProxy",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "richpanel:jsGlobal:3",
			kind: "jsGlobal",
			property: "richpanel_messenger_url",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
