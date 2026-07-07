import type { TechnologyDefinition } from '../../types';

export const robinTechnologyDefinition = {
	id: "robin",
	name: "Robin",
	website: "https://www.robinhq.com",
	icon: "Robin.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "robin:jsGlobal:0",
			kind: "jsGlobal",
			property: "_robin_getRobinJs",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "robin:jsGlobal:1",
			kind: "jsGlobal",
			property: "robin_settings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "robin:jsGlobal:2",
			kind: "jsGlobal",
			property: "robin_storage_settings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
