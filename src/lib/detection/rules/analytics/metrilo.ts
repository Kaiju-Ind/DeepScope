import type { TechnologyDefinition } from '../../types';

export const metriloTechnologyDefinition = {
	id: "metrilo",
	name: "Metrilo",
	website: "https://www.metrilo.com",
	description: "Metrilo is an ecommerce analytics, email marketing software provider.",
	icon: "Metrilo.svg",
	categories: [
		"analytics",
		"email-messaging",
	],
	rules: [
		{
			id: "metrilo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.metrilo\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "metrilo:jsGlobal:1",
			kind: "jsGlobal",
			property: "metrilo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "metrilo:jsGlobal:2",
			kind: "jsGlobal",
			property: "metriloBotRegexp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "metrilo:jsGlobal:3",
			kind: "jsGlobal",
			property: "metriloCookie",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
