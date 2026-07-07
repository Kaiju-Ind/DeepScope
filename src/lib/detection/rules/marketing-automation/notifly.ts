import type { TechnologyDefinition } from '../../types';

export const notiflyTechnologyDefinition = {
	id: "notifly",
	name: "Notifly",
	website: "https://notifly.tech",
	description: "Notifly is a marketing automation tool designed to streamline the process of running multi-channel campaigns.",
	icon: "Notifly.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "notifly:jsGlobal:0",
			kind: "jsGlobal",
			property: "NotiflyWebMessageRenderer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "notifly:jsGlobal:1",
			kind: "jsGlobal",
			property: "__notiflyCafe24Config",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "notifly:jsGlobal:2",
			kind: "jsGlobal",
			property: "notifly",
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
