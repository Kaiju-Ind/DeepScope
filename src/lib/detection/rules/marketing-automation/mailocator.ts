import type { TechnologyDefinition } from '../../types';

export const mailocatorTechnologyDefinition = {
	id: "mailocator",
	name: "Mailocator",
	website: "https://mailocator.com",
	description: "Mailocator is a display platform designed to enhance conversions by facilitating lead collection, data gathering, and sales growth.",
	icon: "Mailocator.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "mailocator:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.mailocator\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "mailocator:jsGlobal:1",
			kind: "jsGlobal",
			property: "Mailocator5",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mailocator:jsGlobal:2",
			kind: "jsGlobal",
			property: "MailocatorTestDisplay",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
