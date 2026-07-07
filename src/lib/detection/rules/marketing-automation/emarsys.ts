import type { TechnologyDefinition } from '../../types';

export const emarsysTechnologyDefinition = {
	id: "emarsys",
	name: "Emarsys",
	website: "https://emarsys.com/",
	description: "Emarsys is a B2C customer engagement and marketing automation platform.",
	icon: "Emarsys.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "emarsys:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:static|cdn)\\.scarabresearch\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "emarsys:jsGlobal:1",
			kind: "jsGlobal",
			property: "Scarab",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "emarsys:jsGlobal:2",
			kind: "jsGlobal",
			property: "ScarabQueue",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
