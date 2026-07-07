import type { TechnologyDefinition } from '../../types';

export const chartbeatTechnologyDefinition = {
	id: "chartbeat",
	name: "Chartbeat",
	website: "https://chartbeat.com",
	description: "Chartbeat is a web analytics service that provides real-time data and insights into website performance, audience engagement, and content effectiveness for publishers and media organizations.",
	icon: "Chartbeat.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "chartbeat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("chartbeat\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chartbeat:jsGlobal:1",
			kind: "jsGlobal",
			property: "_sf_async_config",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chartbeat:jsGlobal:2",
			kind: "jsGlobal",
			property: "_sf_endpt",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
