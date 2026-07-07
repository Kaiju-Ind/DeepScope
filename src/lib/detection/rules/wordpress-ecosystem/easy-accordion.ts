import type { TechnologyDefinition } from '../../types';

export const easyAccordionTechnologyDefinition = {
	id: "easy-accordion",
	name: "Easy Accordion",
	website: "https://easyaccordion.io",
	description: "Easy Accordion is a flexible and customisable accordion and FAQs builder plugin for WordPress.",
	icon: "EasyAccordion.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "easy-accordion:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/easy-accordion-free\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "easy-accordion:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/easy-accordion-free/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
