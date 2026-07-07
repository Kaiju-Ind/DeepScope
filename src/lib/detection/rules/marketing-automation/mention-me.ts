import type { TechnologyDefinition } from '../../types';

export const mentionMeTechnologyDefinition = {
	id: "mention-me",
	name: "Mention Me",
	website: "https://www.mention-me.com",
	description: "Mention Me is a referral marketing platform for conversion-obsessed ecommerce brands.",
	icon: "Mention Me.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "mention-me:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.mention-me\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mention-me:jsGlobal:1",
			kind: "jsGlobal",
			property: "MentionMe",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
