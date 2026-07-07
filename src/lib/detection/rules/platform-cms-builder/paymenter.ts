import type { TechnologyDefinition } from '../../types';

export const paymenterTechnologyDefinition = {
	id: "paymenter",
	name: "Paymenter",
	website: "https://paymenter.org",
	description: "Paymenter is an open-source webshop solution for hosting companies.",
	icon: "Paymenter.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "paymenter:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^paymenter_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"mysql",
		"php",
		"tailwind-css",
	],
} as const satisfies TechnologyDefinition;
