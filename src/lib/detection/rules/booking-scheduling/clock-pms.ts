import type { TechnologyDefinition } from '../../types';

export const clockPmsTechnologyDefinition = {
	id: "clock-pms",
	name: "Clock PMS",
	website: "https://www.clock-software.com",
	description: "Clock PMS is a hotel booking software designed to streamline reservations, manage guest information, and optimise hotel operations.",
	icon: "ClockPMS.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "clock-pms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.clock-software\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "clock-pms:jsGlobal:1",
			kind: "jsGlobal",
			property: "clock_pms_iframe",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
