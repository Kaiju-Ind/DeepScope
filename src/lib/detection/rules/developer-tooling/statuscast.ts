import type { TechnologyDefinition } from '../../types';

export const statuscastTechnologyDefinition = {
	id: "statuscast",
	name: "StatusCast",
	website: "https://statuscast.com/status-page/",
	description: "StatusCast is a hosted status page management software.",
	icon: "StatusCast.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "statuscast:jsGlobal:0",
			kind: "jsGlobal",
			property: "statuscast.libs.datatables",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "statuscast:jsGlobal:1",
			kind: "jsGlobal",
			property: "statuscast.ui",
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
