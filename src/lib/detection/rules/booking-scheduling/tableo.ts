import type { TechnologyDefinition } from '../../types';

export const tableoTechnologyDefinition = {
	id: "tableo",
	name: "Tableo",
	website: "https://tableo.com",
	description: "Tableo is a platform that streamlines restaurant reservation management, optimizing booking schedules and improving table utilization.",
	icon: "Tableo.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "tableo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.tableo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tableo:dom:1",
			kind: "dom",
			selector: "iframe[src*='.tableo.com']",
			description: "DOM selector matches a known technology marker.",
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
