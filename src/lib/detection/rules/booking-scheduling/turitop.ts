import type { TechnologyDefinition } from '../../types';

export const turitopTechnologyDefinition = {
	id: "turitop",
	name: "TuriTop",
	website: "https://www.turitop.com",
	description: "TuriTop is a booking software for tours and activities that streamlines scheduling and reservation management through an automated interface.",
	icon: "TuriTop.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "turitop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.turitop\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "turitop:jsGlobal:1",
			kind: "jsGlobal",
			property: "httpTuritop",
			valuePattern: new RegExp("app\\.turitop\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "turitop:jsGlobal:2",
			kind: "jsGlobal",
			property: "turitopBuild",
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
