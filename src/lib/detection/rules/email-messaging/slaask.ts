import type { TechnologyDefinition } from '../../types';

export const slaaskTechnologyDefinition = {
	id: "slaask",
	name: "Slaask",
	website: "https://get.slaask.com",
	description: "Slaask is a customer messaging app designed for all Slack users to streamline customer service communication within the Slack interface.",
	icon: "Slaask.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "slaask:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.slaask\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "slaask:jsGlobal:1",
			kind: "jsGlobal",
			property: "_slaaskLoader",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "slaask:jsGlobal:2",
			kind: "jsGlobal",
			property: "_slaaskSettings",
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
