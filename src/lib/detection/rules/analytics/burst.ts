import type { TechnologyDefinition } from '../../types';

export const burstTechnologyDefinition = {
	id: "burst",
	name: "Burst",
	website: "https://burst-statistics.com",
	description: "Burst Statistics keeps all data on your server, making it fully compliant with privacy laws. Our dashboards offer clear and concise insights, allowing you to make informed decisions without feeling overwhelmed by abundant data. Choose Burst Statistics for seamless and reliable analytics trusted by over 100,000 users.",
	icon: "Burst.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "burst:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\/js\\/build\\/burst"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "burst:jsGlobal:1",
			kind: "jsGlobal",
			property: "burst.url",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
