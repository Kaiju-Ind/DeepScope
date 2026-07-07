import type { TechnologyDefinition } from '../../types';

export const channelIoTechnologyDefinition = {
	id: "channel-io",
	name: "Channel.io",
	website: "https://channel.io",
	description: "Channel.io is an all-in-one business communication platform that helps businesses connect with customers.",
	icon: "Channel.io.png",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "channel-io:jsGlobal:0",
			kind: "jsGlobal",
			property: "ChannelIO",
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
