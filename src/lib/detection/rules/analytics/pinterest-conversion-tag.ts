import type { TechnologyDefinition } from '../../types';

export const pinterestConversionTagTechnologyDefinition = {
	id: "pinterest-conversion-tag",
	name: "Pinterest Conversion Tag",
	website: "https://www.pinterest.com.au/business/",
	description: "Pinterest Conversion Tag allows you to track actions people take on your website after viewing your Promoted Pin.",
	icon: "Pinterest.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "pinterest-conversion-tag:dom:0",
			kind: "dom",
			selector: "img[src*='ct.pinterest.com/v3/?tid']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "pinterest-conversion-tag:jsGlobal:1",
			kind: "jsGlobal",
			property: "pintrk",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
