import type { TechnologyDefinition } from '../../types';

export const leaddynoTechnologyDefinition = {
	id: "leaddyno",
	name: "LeadDyno",
	website: "https://www.leaddyno.com",
	description: "LeadDyno is a platform that provides affiliate marketing and tracking services, allowing businesses to set up, manage, and analyse their affiliate programs.",
	icon: "LeadDyno.svg",
	categories: [
		"advertising-paid-media",
		"analytics",
	],
	rules: [
		{
			id: "leaddyno:jsGlobal:0",
			kind: "jsGlobal",
			property: "LeadDyno",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "leaddyno:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^_leaddyno_session$", "i"),
			description: "Cookie name matches a known technology marker.",
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
