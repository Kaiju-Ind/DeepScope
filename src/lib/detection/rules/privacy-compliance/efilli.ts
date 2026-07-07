import type { TechnologyDefinition } from '../../types';

export const efilliTechnologyDefinition = {
	id: "efilli",
	name: "Efilli",
	website: "https://efilli.com",
	description: "Efilli is a tool used to manage cookies on websites, providing users with data privacy control through GDPR compliance.",
	icon: "Efilli.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "efilli:jsGlobal:0",
			kind: "jsGlobal",
			property: "EFILLI_GLOBAL_OPTIONS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "efilli:jsGlobal:1",
			kind: "jsGlobal",
			property: "Efilli",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "efilli:jsGlobal:2",
			kind: "jsGlobal",
			property: "efilli.__cookieBlocker",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "efilli:jsGlobal:3",
			kind: "jsGlobal",
			property: "efilliSdk",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "efilli:jsGlobal:4",
			kind: "jsGlobal",
			property: "efilliSdkConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
