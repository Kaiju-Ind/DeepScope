import type { TechnologyDefinition } from '../../types';

export const facebookPixelAdvancedMatchingTechnologyDefinition = {
	id: "facebook-pixel-advanced-matching",
	name: "Facebook Pixel Advanced Matching",
	website: "https://www.facebook.com/business/help/611774685654668?id=1205376682832142",
	description: "Facebook Pixel Advanced Matching is a feature that allows the optimization of Meta ads by sending hashed customer information with Meta Pixel events, aiding in improved conversion attribution and broader audience reach.",
	icon: "Meta.svg",
	categories: [
		"tag-management",
	],
	rules: [
		{
			id: "facebook-pixel-advanced-matching:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("facebook\\.com\\/tr\\/"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "facebook-pixel-advanced-matching:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("udff\\[em\\]=[a-fA-F0-9]{64}"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "facebook-pixel-advanced-matching:requestUrl:2",
			kind: "requestUrl",
			pattern: new RegExp("udff\\[.+\\]=[a-fA-F0-9]+"),
			description: "Observed request URL matches a known technology marker.",
		},
	],
	implies: [
		"facebook-pixel",
	],
} as const satisfies TechnologyDefinition;
