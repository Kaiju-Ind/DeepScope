import type { TechnologyDefinition } from '../../types';

export const yogatrailTechnologyDefinition = {
	id: "yogatrail",
	name: "YogaTrail",
	website: "https://www.buzzwoo.de/projekte-kunden/yogatrail",
	description: "YogaTrail is a software platform for managing yoga businesses.",
	icon: "YogaTrail.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "yogatrail:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.yogatrail\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
