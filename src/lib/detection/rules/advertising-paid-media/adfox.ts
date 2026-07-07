import type { TechnologyDefinition } from '../../types';

export const adfoxTechnologyDefinition = {
	id: "adfox",
	name: "ADFOX",
	website: "https://adfox.yandex.ru",
	description: "ADFOX is an advertising management platform for media publishers.",
	icon: "ADFOX.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "adfox:jsGlobal:0",
			kind: "jsGlobal",
			property: "AdFox_getCodeScript",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adfox:jsGlobal:1",
			kind: "jsGlobal",
			property: "Site.adFoxParams",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adfox:jsGlobal:2",
			kind: "jsGlobal",
			property: "adFoxParams",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adfox:jsGlobal:3",
			kind: "jsGlobal",
			property: "adfoxAsyncParams",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adfox:jsGlobal:4",
			kind: "jsGlobal",
			property: "adfoxBiddersMap",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
