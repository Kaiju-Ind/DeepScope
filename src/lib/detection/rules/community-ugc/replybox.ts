import type { TechnologyDefinition } from '../../types';

export const replyboxTechnologyDefinition = {
	id: "replybox",
	name: "ReplyBox",
	website: "https://getreplybox.com",
	description: "ReplyBox is a privacy-focused comment system designed to collect, store, and display user feedback while minimizing data exposure and supporting secure interaction.",
	icon: "ReplyBox.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "replybox:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.getreplybox\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "replybox:jsGlobal:1",
			kind: "jsGlobal",
			property: "replybox.site",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
