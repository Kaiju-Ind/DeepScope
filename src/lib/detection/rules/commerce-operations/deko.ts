import type { TechnologyDefinition } from '../../types';

export const dekoTechnologyDefinition = {
	id: "deko",
	name: "Deko",
	website: "https://www.dekopay.com",
	description: "Deko is a retail finance technology platform used by UK merchants, formerly known as Pay4Later.",
	icon: "Deko.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "deko:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("secure\\.dekopay\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
