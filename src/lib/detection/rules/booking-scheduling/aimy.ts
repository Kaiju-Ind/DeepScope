import type { TechnologyDefinition } from '../../types';

export const aimyTechnologyDefinition = {
	id: "aimy",
	name: "Aimy",
	website: "https://meetaimy.com",
	description: "Aimy is a salon management platform that provides scheduling tools, a virtual assistant, and calendar maintenance features to streamline salon operations.",
	icon: "Aimy.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "aimy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.meetaimy\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "aimy:jsGlobal:1",
			kind: "jsGlobal",
			property: "MeetAimyMeta",
			description: "Page-owned global matches a known technology marker.",
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
