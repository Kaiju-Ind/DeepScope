import type { TechnologyDefinition } from '../../types';

export const swetrixTechnologyDefinition = {
	id: "swetrix",
	name: "Swetrix",
	website: "https://swetrix.com",
	description: "Swetrix is an open-source analytics platform that offers data analysis and reporting features for various use cases.",
	icon: "Swetrix.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "swetrix:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.swetrix\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "swetrix:jsGlobal:1",
			kind: "jsGlobal",
			property: "swetrix.LIB_INSTANCE",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
