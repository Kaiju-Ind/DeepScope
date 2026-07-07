import type { TechnologyDefinition } from '../../types';

export const concertTechnologyDefinition = {
	id: "concert",
	name: "Concert",
	website: "https://concert.io",
	description: "Concert is a publisher-led marketplace for ads by Vox Media.",
	icon: "Concert.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "concert:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.concert\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "concert:jsGlobal:1",
			kind: "jsGlobal",
			property: "CONCERT_ADS_CONFIG",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "concert:jsGlobal:2",
			kind: "jsGlobal",
			property: "ConcertAds",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"vox-media",
	],
} as const satisfies TechnologyDefinition;
