import type { TechnologyDefinition } from '../../types';

export const kudobuzzTechnologyDefinition = {
	id: "kudobuzz",
	name: "Kudobuzz",
	website: "https://kudobuzz.com/",
	description: "Kudobuzz is a tool for collecting and managing customer reviews.",
	icon: "kudobuzz.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "kudobuzz:jsGlobal:0",
			kind: "jsGlobal",
			property: "Kudos.apiServer",
			valuePattern: new RegExp("api\\.kudobuzz\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"svelte",
	],
} as const satisfies TechnologyDefinition;
