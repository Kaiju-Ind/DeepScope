import type { TechnologyDefinition } from '../../types';

export const blinkAiTechnologyDefinition = {
	id: "blink-ai",
	name: "BLiNK AI",
	website: "https://blinkai.com",
	description: "BLiNK AI is a platform that assists businesses in automating service scheduling and marketing operations for dealerships.",
	icon: "BLiNKAI.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "blink-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.blinkai\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "blink-ai:jsGlobal:1",
			kind: "jsGlobal",
			property: "BlinkAI",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "blink-ai:jsGlobal:2",
			kind: "jsGlobal",
			property: "blinkai.autoOpen",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
