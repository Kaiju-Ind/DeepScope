import type { TechnologyDefinition } from '../../types';

export const dealspotrTechnologyDefinition = {
	id: "dealspotr",
	name: "Dealspotr",
	website: "https://dealspotr.com",
	description: "Dealspotr is a deal finder platform that helps display and organize discounts, coupons, and promotional offers from various retailers on a website.",
	icon: "Dealspotr.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "dealspotr:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.dealspotr\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "dealspotr:dom:1",
			kind: "dom",
			selector: "a[href*='dealspotr.com'] > img[src*='cdn.dealspotr.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
