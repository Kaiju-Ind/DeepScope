import type { TechnologyDefinition } from '../../types';

export const hakuTechnologyDefinition = {
	id: "haku",
	name: "Haku",
	website: "https://hakusports.com",
	description: "Haku is a technology platform for endurance races that supports organizations in growing participation, increasing registrations, and improving event experiences.",
	icon: "Haku.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "haku:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.hakuapp\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "haku:jsGlobal:1",
			kind: "jsGlobal",
			property: "addHakuRegisterEvent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "haku:jsGlobal:2",
			kind: "jsGlobal",
			property: "addHakuSubmitEvent",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
