import type { TechnologyDefinition } from '../../types';

export const bookteqTechnologyDefinition = {
	id: "bookteq",
	name: "Bookteq",
	website: "https://www.bookteq.com",
	description: "Bookteq is a sports facility booking software that enables schools, clubs, and councils to manage reservations online.",
	icon: "Bookteq.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "bookteq:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("widget\\.bookteq\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "bookteq:dom:1",
			kind: "dom",
			selector: "link[href*='.bookteq.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
