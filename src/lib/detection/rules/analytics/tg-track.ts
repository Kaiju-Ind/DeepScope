import type { TechnologyDefinition } from '../../types';

export const tgTrackTechnologyDefinition = {
	id: "tg-track",
	name: "TG Track",
	website: "https://tgtrack.ru",
	description: "TG Track is a Telegram bot that analyzes subscription data upon registration.",
	icon: "TGTrack.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "tg-track:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.tgtrack\\.ru\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
