import type { TechnologyDefinition } from '../../types';

export const nitropackTechnologyDefinition = {
	id: "nitropack",
	name: "NitroPack",
	website: "https://nitropack.io/",
	description: "NitroPack creates optimised HTML cache for fast page loading experience.",
	icon: "NitroPack.svg",
	categories: [
		"server-runtime-infra",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "nitropack:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("NitroPack", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "nitropack:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("nitropack", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
