import type { TechnologyDefinition } from '../../types';

export const embedsocialTechnologyDefinition = {
	id: "embedsocial",
	name: "EmbedSocial",
	website: "https://embedsocial.com",
	description: "EmbedSocial is a social media management platform.",
	icon: "EmbedSocial.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "embedsocial:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embedsocial\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "embedsocial:jsGlobal:1",
			kind: "jsGlobal",
			property: "EMBEDSOCIALHASHTAG",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "embedsocial:jsGlobal:2",
			kind: "jsGlobal",
			property: "EmbedSocialIframeLightbox",
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
