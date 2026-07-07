import type { TechnologyDefinition } from '../../types';

export const webeyezTechnologyDefinition = {
	id: "webeyez",
	name: "Webeyez",
	website: "https://www.webeyez.com",
	description: "Webeyez is an ecommerce monitoring and analytics solution designed to assist teams in identifying, alerting, prioritising, and resolving operational and technical issues for revenue recovery.",
	icon: "Webeyez.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "webeyez:jsGlobal:0",
			kind: "jsGlobal",
			property: "___WEBEYEZ_CACHE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webeyez:jsGlobal:1",
			kind: "jsGlobal",
			property: "___WEBEYEZ_REGISTER_ERROR",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webeyez:jsGlobal:2",
			kind: "jsGlobal",
			property: "webeyez_wzPageEntryKey",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webeyez:jsGlobal:3",
			kind: "jsGlobal",
			property: "webeyezstartAll",
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
