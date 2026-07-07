import type { TechnologyDefinition } from '../../types';

export const rezgoTechnologyDefinition = {
	id: "rezgo",
	name: "Rezgo",
	website: "https://www.rezgo.com",
	description: "Rezgo is a tour operator software that provides online booking system.",
	icon: "Rezgo.svg",
	categories: [
		"widgets-misc",
		"booking-scheduling",
	],
	rules: [
		{
			id: "rezgo:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\.rezgo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rezgo:dom:3",
			kind: "dom",
			selector: "iframe[id*='rezgo_content_frame']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "rezgo:dom:4",
			kind: "dom",
			selector: "link[href*='wp-content/plugins/rezgo/rezgo/templates']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "rezgo:dom:5",
			kind: "dom",
			selector: "iframe[id*='rezgo_content_frame'], link[href*='wp-content/plugins/rezgo/rezgo/templates']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
