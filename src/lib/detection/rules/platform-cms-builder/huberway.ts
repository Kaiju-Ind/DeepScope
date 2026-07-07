import type { TechnologyDefinition } from '../../types';

export const huberwayTechnologyDefinition = {
	id: "huberway",
	name: "Huberway",
	website: "https://www.huberway.com",
	description: "Huberway is a content management system, based on PHP and JavaScript, used to create advanced sales portals oriented towards industrialization 4.0.",
	icon: "Huberway.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "huberway:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^huberway_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
