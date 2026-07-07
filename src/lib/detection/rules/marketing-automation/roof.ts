import type { TechnologyDefinition } from '../../types';

export const roofTechnologyDefinition = {
	id: "roof",
	name: "Roof",
	website: "https://www.roofai.com",
	description: "Roof is a platform that supports real estate companies in increasing online revenue through integrated digital solutions powered by artificial intelligence and online marketing services.",
	icon: "Roof.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "roof:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.roof\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "roof:jsGlobal:1",
			kind: "jsGlobal",
			property: "RoofWebMessenger",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "roof:jsGlobal:2",
			kind: "jsGlobal",
			property: "openRoofChat",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
