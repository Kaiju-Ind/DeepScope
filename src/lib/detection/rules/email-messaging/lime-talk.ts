import type { TechnologyDefinition } from '../../types';

export const limeTalkTechnologyDefinition = {
	id: "lime-talk",
	name: "Lime Talk",
	website: "https://www.limetalk.com",
	description: "Lime Talk is a real-time customer messaging platform designed for businesses to engage with website visitors and customers through live chat functionality.",
	icon: "LimeTalk.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "lime-talk:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.limetalk\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "lime-talk:jsGlobal:1",
			kind: "jsGlobal",
			property: "limetalk",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lime-talk:jsGlobal:2",
			kind: "jsGlobal",
			property: "limetalkLoader",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
