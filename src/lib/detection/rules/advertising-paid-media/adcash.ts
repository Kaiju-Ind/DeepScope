import type { TechnologyDefinition } from '../../types';

export const adcashTechnologyDefinition = {
	id: "adcash",
	name: "Adcash",
	website: "https://adcash.com",
	icon: "Adcash.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "adcash:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^[^\\/]*\\/\\/(?:[^\\/]+\\.)?adcash\\.com\\/(?:script|ad)\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adcash:url:1",
			kind: "url",
			pattern: new RegExp("^https?:\\/\\/(?:[^\\/]+\\.)?adcash\\.com\\/script\\/pop_"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "adcash:jsGlobal:2",
			kind: "jsGlobal",
			property: "SuLoaded",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adcash:jsGlobal:3",
			kind: "jsGlobal",
			property: "SuUrl",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adcash:jsGlobal:4",
			kind: "jsGlobal",
			property: "ac_bgclick_URL",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adcash:jsGlobal:5",
			kind: "jsGlobal",
			property: "ct_nOpp",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adcash:jsGlobal:6",
			kind: "jsGlobal",
			property: "ct_nSuUrl",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adcash:jsGlobal:7",
			kind: "jsGlobal",
			property: "ct_siteunder",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adcash:jsGlobal:8",
			kind: "jsGlobal",
			property: "ct_tag",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
