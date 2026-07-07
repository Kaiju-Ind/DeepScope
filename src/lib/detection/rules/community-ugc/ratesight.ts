import type { TechnologyDefinition } from '../../types';

export const ratesightTechnologyDefinition = {
	id: "ratesight",
	name: "Ratesight",
	website: "https://ratesight.com",
	description: "Ratesight is an online review management software that helps businesses collect and track online reviews.",
	icon: "RateSight.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "ratesight:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ratesight\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ratesight:dom:1",
			kind: "dom",
			selector: "script#ratesight-sidebar-widget",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
