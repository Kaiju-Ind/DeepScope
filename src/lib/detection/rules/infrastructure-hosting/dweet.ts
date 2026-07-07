import type { TechnologyDefinition } from '../../types';

export const dweetTechnologyDefinition = {
	id: "dweet",
	name: "Dweet",
	website: "https://dweet.io",
	description: "Dweet is a platform enabling data sharing across Internet of Things(IoT).",
	icon: "Dweet.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "dweet:jsGlobal:0",
			kind: "jsGlobal",
			property: "dweetCallback",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dweet:jsGlobal:1",
			kind: "jsGlobal",
			property: "dweet_script_loader",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dweet:jsGlobal:2",
			kind: "jsGlobal",
			property: "dweetio.dweet",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dweet:jsGlobal:3",
			kind: "jsGlobal",
			property: "dweetioThing",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
