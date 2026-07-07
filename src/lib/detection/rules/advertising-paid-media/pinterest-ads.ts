import type { TechnologyDefinition } from '../../types';

export const pinterestAdsTechnologyDefinition = {
	id: "pinterest-ads",
	name: "Pinterest Ads",
	website: "https://ads.pinterest.com/",
	description: "Pinterest Ads is an online advertising platform developed by Pinterest.",
	icon: "Pinterest.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "pinterest-ads:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("ct\\.pinterest\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
