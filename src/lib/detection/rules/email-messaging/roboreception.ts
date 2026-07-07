import type { TechnologyDefinition } from '../../types';

export const roboreceptionTechnologyDefinition = {
	id: "roboreception",
	name: "RoboReception",
	website: "https://www.roboreception.co.uk",
	description: "RoboReception is a digital assistant that manages patient inquiries, reduces queues, and tracks new leads to ease the workload on reception staff.",
	icon: "RoboReception.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "roboreception:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.bot\\.roboreception\\.co\\.uk"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "roboreception:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.bot\\.roboreception\\.co\\.uk"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
