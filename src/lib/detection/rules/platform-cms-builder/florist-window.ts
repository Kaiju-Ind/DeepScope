import type { TechnologyDefinition } from '../../types';

export const floristWindowTechnologyDefinition = {
	id: "florist-window",
	name: "Florist Window",
	website: "https://www.floristwindow.com",
	description: "Florist Window is an ecommerce platform designed for florists in the UK to manage online sales and customer orders.",
	icon: "FloristWindow.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "florist-window:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^florist$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "florist-window:meta:1",
			kind: "meta",
			key: "document-classification",
			valuePattern: new RegExp("^Florists$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "florist-window:meta:2",
			kind: "meta",
			key: "document-classification",
			valuePattern: new RegExp("^florists$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
