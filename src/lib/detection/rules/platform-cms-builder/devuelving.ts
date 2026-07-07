import type { TechnologyDefinition } from '../../types';

export const devuelvingTechnologyDefinition = {
	id: "devuelving",
	name: "Devuelving",
	website: "https://www.devuelving.com",
	description: "Devuelving is an online store franchise system designed to support the management, operation, and scaling of e-commerce businesses through centralized tools and processes.",
	icon: "Devuelving.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "devuelving:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^devuelving_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
