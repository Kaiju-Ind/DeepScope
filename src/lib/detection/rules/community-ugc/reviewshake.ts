import type { TechnologyDefinition } from '../../types';

export const reviewshakeTechnologyDefinition = {
	id: "reviewshake",
	name: "Reviewshake",
	website: "https://www.reviewshake.com/",
	description: "Reviewshake is an all-in-one reputation management tool that generates reviews, enhances your brand, and monitors your reputation.",
	icon: "Reviewshake.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "reviewshake:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.reviewshake\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "reviewshake:jsGlobal:1",
			kind: "jsGlobal",
			property: "Rails.appUrl",
			valuePattern: new RegExp("app\\.reviewshake\\.com"),
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
