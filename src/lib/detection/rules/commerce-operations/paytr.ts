import type { TechnologyDefinition } from '../../types';

export const paytrTechnologyDefinition = {
	id: "paytr",
	name: "PAYTR",
	website: "https://www.paytr.com",
	description: "PAYTR is a platform that enables secure remote management of all payment transactions.",
	icon: "PAYTR.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "paytr:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.paytr\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
