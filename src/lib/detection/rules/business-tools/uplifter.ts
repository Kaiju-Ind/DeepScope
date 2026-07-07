import type { TechnologyDefinition } from '../../types';

export const uplifterTechnologyDefinition = {
	id: "uplifter",
	name: "Uplifter",
	website: "https://www.uplifterinc.com",
	description: "Uplifter is a membership management software that organizes member data, tracks participation, processes payments, and supports communication within organizations.",
	icon: "Uplifter.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "uplifter:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.uplifterinc\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "uplifter:jsGlobal:1",
			kind: "jsGlobal",
			property: "UPLIFTER_STRTOTIME_SETTINGS",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
