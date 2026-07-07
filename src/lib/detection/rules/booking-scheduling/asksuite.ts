import type { TechnologyDefinition } from '../../types';

export const asksuiteTechnologyDefinition = {
	id: "asksuite",
	name: "Asksuite",
	website: "https://asksuite.com",
	description: "Asksuite is a platform that enhances direct bookings and revenue for hotels and resorts by improving service experiences and boosting reservation sales productivity.",
	icon: "Asksuite.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "asksuite:jsGlobal:0",
			kind: "jsGlobal",
			property: "AsksuiteUtil.calcTime",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "asksuite:jsGlobal:1",
			kind: "jsGlobal",
			property: "asksuiteLocalStorage",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "asksuite:jsGlobal:2",
			kind: "jsGlobal",
			property: "asksuiteLog",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "asksuite:jsGlobal:3",
			kind: "jsGlobal",
			property: "asksuiteSessionStorage",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
