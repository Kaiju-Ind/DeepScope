import type { TechnologyDefinition } from '../../types';

export const comscoreTechnologyDefinition = {
	id: "comscore",
	name: "comScore",
	website: "https://comscore.com",
	description: "comScore is an American media measurement and analytics company providing marketing data and analytics to enterprises; media and advertising agencies; and publishers.",
	icon: "comScore.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "comscore:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.scorecardresearch\\.com\\/beacon\\.js|COMSCORE\\.beacon"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "comscore:dom:1",
			kind: "dom",
			selector: "iframe[src*='.scorecardresearch.com/beacon'], iframe#comscore, iframe[src*='COMSCORE.beacon']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "comscore:jsGlobal:2",
			kind: "jsGlobal",
			property: "COMSCORE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "comscore:jsGlobal:3",
			kind: "jsGlobal",
			property: "_COMSCORE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "comscore:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("\\.scorecardresearch\\.com\\/beacon\\.js|comscore\\.beacon"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
