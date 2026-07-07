import type { TechnologyDefinition } from '../../types';

export const umniTechnologyDefinition = {
	id: "umni",
	name: "Umni",
	website: "https://umni.bg",
	description: "Umni is a platform that provides an AI chatbot designed to automate and improve customer service, sales interactions, and marketing processes.",
	icon: "Umni.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "umni:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.umni\\.bg"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
