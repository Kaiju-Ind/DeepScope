import type { TechnologyDefinition } from '../../types';

export const talkjsTechnologyDefinition = {
	id: "talkjs",
	name: "TalkJS",
	website: "https://talkjs.com",
	description: "TalkJS is a platform that enables user-to-user messaging within marketplaces or platforms.",
	icon: "TalkJS.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "talkjs:jsGlobal:0",
			kind: "jsGlobal",
			property: "Talk.v",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "talkjs:jsGlobal:1",
			kind: "jsGlobal",
			property: "_talkjs_locales",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
