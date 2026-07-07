import type { TechnologyDefinition } from '../../types';

export const bentoTechnologyDefinition = {
	id: "bento",
	name: "Bento",
	website: "https://bentonow.com",
	description: "Bento is an email marketing and automation platform designed for startups.",
	icon: "Bento.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "bento:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.bentonow\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bento:jsGlobal:1",
			kind: "jsGlobal",
			property: "bento.identify",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bento:jsGlobal:2",
			kind: "jsGlobal",
			property: "bento_wordpress_sdk_params",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
