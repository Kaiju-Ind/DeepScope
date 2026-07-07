import type { TechnologyDefinition } from '../../types';

export const talkMeTechnologyDefinition = {
	id: "talk-me",
	name: "Talk-Me",
	website: "https://talk-me.ru",
	description: "Talk-Me is a chat system designed to enhance sales growth by facilitating customer communication, offering a range of tools to help businesses find new clients through their websites.",
	icon: "TalkMe.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "talk-me:jsGlobal:0",
			kind: "jsGlobal",
			property: "MeTalk",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "talk-me:jsGlobal:1",
			kind: "jsGlobal",
			property: "TalkMe",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "talk-me:jsGlobal:2",
			kind: "jsGlobal",
			property: "TalkMeIsInitialized",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "talk-me:jsGlobal:3",
			kind: "jsGlobal",
			property: "TalkMeSetup",
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
