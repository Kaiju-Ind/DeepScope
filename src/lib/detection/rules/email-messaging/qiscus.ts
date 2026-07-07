import type { TechnologyDefinition } from '../../types';

export const qiscusTechnologyDefinition = {
	id: "qiscus",
	name: "Qiscus",
	website: "https://www.qiscus.com",
	description: "Qiscus is a platform offering a Chat SDK and messaging API, enabling integration of real-time chat features into applications.",
	icon: "Qiscus.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "qiscus:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.qiscus\\.com\\/js\\/qiscus-sdk\\.([\\d\\.]+)\\.js\\?v=([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "qiscus:jsGlobal:1",
			kind: "jsGlobal",
			property: "QiscusSDK",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "qiscus:jsGlobal:2",
			kind: "jsGlobal",
			property: "qiscusWidgetshowBadge",
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
