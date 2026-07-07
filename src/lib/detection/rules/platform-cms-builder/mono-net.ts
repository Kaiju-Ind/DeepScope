import type { TechnologyDefinition } from '../../types';

export const monoNetTechnologyDefinition = {
	id: "mono-net",
	name: "Mono.net",
	website: "https://www.mono.net/en",
	description: "Mono.net is a website builder platform designed for businesses to create and manage their own websites with hosting and online presence tools.",
	icon: "Mono.net.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mono-net:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("monotracker(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mono-net:jsGlobal:1",
			kind: "jsGlobal",
			property: "_monoTracker",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"matomo-analytics",
	],
} as const satisfies TechnologyDefinition;
