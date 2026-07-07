import type { TechnologyDefinition } from '../../types';

export const uscreenTechnologyDefinition = {
	id: "uscreen",
	name: "Uscreen",
	website: "https://uscreen.tv/",
	description: "Uscreen is a CMS to monetize VOD and live content. They provide site hosting, video hosting, and a payment gateway for selling video based content.",
	icon: "Uscreen.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "uscreen:dom:0",
			kind: "dom",
			selector: ".powered-by-uscreen",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "uscreen:jsGlobal:1",
			kind: "jsGlobal",
			property: "analyticsHost",
			valuePattern: new RegExp("stats\\.uscreen\\.io"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
