import type { TechnologyDefinition } from '../../types';

export const k50TechnologyDefinition = {
	id: "k50",
	name: "K50",
	website: "https://k50.ru",
	description: "K50 is a platform that automates online advertising and the promotion of products and services across digital channels.",
	icon: "K50.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "k50:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("k50-a\\.akamaihd\\.net\\/k50\\/k50tracker2\\.js"),
			description: "Script source URL matches a known technology marker.",
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
