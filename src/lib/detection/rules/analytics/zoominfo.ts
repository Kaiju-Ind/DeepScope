import type { TechnologyDefinition } from '../../types';

export const zoominfoTechnologyDefinition = {
	id: "zoominfo",
	name: "Zoominfo",
	website: "https://www.zoominfo.com/",
	description: "ZoomInfo provides actionable B2B contact and company information for sales and marketing teams.",
	icon: "Zoominfo.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "zoominfo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ws\\.zoominfo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
