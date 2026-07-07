import type { TechnologyDefinition } from '../../types';

export const acquireLiveChatTechnologyDefinition = {
	id: "acquire-live-chat",
	name: "Acquire Live Chat",
	website: "https://acquire.io",
	description: "Acquire is a multi-channel customer support platform designed to provide real-time customer support to customers.",
	icon: "Acquire.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "acquire-live-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.acquire\\.io\\/(?!cobrowse)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "acquire-live-chat:jsGlobal:1",
			kind: "jsGlobal",
			property: "_acquire_init_config",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "acquire-live-chat:jsGlobal:2",
			kind: "jsGlobal",
			property: "acquire",
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
