import type { TechnologyDefinition } from '../../types';

export const advertStreamTechnologyDefinition = {
	id: "advert-stream",
	name: "Advert Stream",
	website: "https://www.advertstream.com",
	icon: "Advert Stream.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "advert-stream:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:ad\\.advertstream\\.com|adxcore\\.com)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "advert-stream:jsGlobal:1",
			kind: "jsGlobal",
			property: "advst_is_above_the_fold",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
