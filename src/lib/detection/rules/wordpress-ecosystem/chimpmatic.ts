import type { TechnologyDefinition } from '../../types';

export const chimpmaticTechnologyDefinition = {
	id: "chimpmatic",
	name: "Chimpmatic",
	website: "https://chimpmatic.com",
	description: "Chimpmatic is a premium Contact Form 7 and Mailchimp integration plugin.",
	icon: "default.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "chimpmatic:dom:0",
			kind: "dom",
			selector: "form[class*='chimpmatic']",
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
	implies: [
		"contact-form-7",
		"mailchimp",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
