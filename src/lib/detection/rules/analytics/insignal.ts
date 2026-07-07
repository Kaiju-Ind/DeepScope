import type { TechnologyDefinition } from '../../types';

export const insignalTechnologyDefinition = {
	id: "insignal",
	name: "Insignal",
	website: "https://insignal.co/",
	description: "Insignal is a cloud-based application that tracks website traffic, heatmap, timeline, feedback, session recordings, and survey solutions.",
	icon: "Insignal.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "insignal:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.insignal\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
