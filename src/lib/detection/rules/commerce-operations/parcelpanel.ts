import type { TechnologyDefinition } from '../../types';

export const parcelpanelTechnologyDefinition = {
	id: "parcelpanel",
	name: "ParcelPanel",
	website: "https://www.parcelpanel.com",
	description: "ParcelPanel is a solution for tracking shipments and managing returns for ecommerce businesses.",
	icon: "ParcelPanel.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "parcelpanel:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.parcelpanel\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
