import type { TechnologyDefinition } from '../../types';

export const helponclickTechnologyDefinition = {
	id: "helponclick",
	name: "HelpOnClick",
	website: "https://helponclick.com",
	description: "HelpOnClick is a live chat and customer tracking platform designed to support real-time communication and monitor visitor interactions on websites.",
	icon: "HelpOnClick.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "helponclick:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.helponclick\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "helponclick:jsGlobal:1",
			kind: "jsGlobal",
			property: "HelpOnClickLogoRoundMask",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "helponclick:jsGlobal:2",
			kind: "jsGlobal",
			property: "HelpOnClick_ChatPrinter_Button",
			description: "Page-owned global matches a known technology marker.",
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
