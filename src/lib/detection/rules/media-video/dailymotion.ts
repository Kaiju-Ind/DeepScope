import type { TechnologyDefinition } from '../../types';

export const dailymotionTechnologyDefinition = {
	id: "dailymotion",
	name: "Dailymotion",
	website: "https://www.dailymotion.com",
	description: "Dailymotion is a French video-sharing technology platform.",
	icon: "Dailymotion.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "dailymotion:dom:0",
			kind: "dom",
			selector: "img[data-src*='.dailymotion.com/'], iframe[src*='.dailymotion.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "dailymotion:meta:1",
			kind: "meta",
			key: "name",
			valuePattern: new RegExp("dailymotion-domain-verification", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
