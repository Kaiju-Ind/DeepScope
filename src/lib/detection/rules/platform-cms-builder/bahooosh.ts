import type { TechnologyDefinition } from '../../types';

export const bahoooshTechnologyDefinition = {
	id: "bahooosh",
	name: "Bahooosh",
	website: "https://bahooosh.com",
	description: "Bahooosh is an online business management platform that integrates AI-powered site building and ecommerce CMS features.",
	icon: "Bahooosh.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bahooosh:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^bahooosh_session$", "i"),
			description: "Cookie name matches a known technology marker.",
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
