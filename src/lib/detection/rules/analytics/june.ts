import type { TechnologyDefinition } from '../../types';

export const juneTechnologyDefinition = {
	id: "june",
	name: "June",
	website: "https://june.so",
	description: "June is a product analytics for subscription businesses. It automatically generates graphs of the metrics users should track by connecting their segment account.",
	icon: "June.svg",
	categories: [
		"analytics",
		"marketing-automation",
	],
	rules: [
		{
			id: "june:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.june\\.so\\/analytics\\.js\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "june:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("a\\.june\\.so"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "june:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^_june_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
