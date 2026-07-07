import type { TechnologyDefinition } from '../../types';

export const pubnubTechnologyDefinition = {
	id: "pubnub",
	name: "PubNub",
	website: "https://www.pubnub.com",
	description: "PubNub is a platform that operates the Data Stream Network, enabling the connection, delivery, and control of data and logic to support real-time applications at a global scale.",
	icon: "PubNub.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "pubnub:jsGlobal:0",
			kind: "jsGlobal",
			property: "PubNub",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pubnub:jsGlobal:1",
			kind: "jsGlobal",
			property: "PubNubCenter",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pubnub:jsGlobal:2",
			kind: "jsGlobal",
			property: "PubNubOccupancy",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pubnub:jsGlobal:3",
			kind: "jsGlobal",
			property: "PubNubPayload",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
