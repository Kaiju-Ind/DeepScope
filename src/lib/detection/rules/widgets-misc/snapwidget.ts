import type { TechnologyDefinition } from '../../types';

export const snapwidgetTechnologyDefinition = {
	id: "snapwidget",
	name: "SnapWidget",
	website: "https://snapwidget.com",
	description: "SnapWidget is a set of interactive Instagram, Twitter and 500px widgets.",
	icon: "SnapWidget.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "snapwidget:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("snapwidget\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "snapwidget:dom:1",
			kind: "dom",
			selector: "iframe[src*='snapwidget.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
