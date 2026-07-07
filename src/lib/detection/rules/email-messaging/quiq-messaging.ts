import type { TechnologyDefinition } from '../../types';

export const quiqMessagingTechnologyDefinition = {
	id: "quiq-messaging",
	name: "Quiq Messaging",
	website: "https://quiq.com",
	description: "Quiq Messaging is a business messaging solution designed to facilitate customer communication across multiple channels.",
	icon: "QuiqMessaging.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "quiq-messaging:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.goquiq\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "quiq-messaging:jsGlobal:1",
			kind: "jsGlobal",
			property: "Quiq",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "quiq-messaging:jsGlobal:2",
			kind: "jsGlobal",
			property: "QuiqUtils",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "quiq-messaging:jsGlobal:3",
			kind: "jsGlobal",
			property: "QuiqUtils._.VERSION",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
