import type { TechnologyDefinition } from '../../types';

export const moinaiTechnologyDefinition = {
	id: "moinai",
	name: "MoinAI",
	website: "https://www.moin.ai",
	description: "MoinAI is an AI platform for digital customer communication, enabling businesses to automate interactions.",
	icon: "MoinAI.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "moinai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.moin\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "moinai:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.moin\\.ai"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "moinai:jsGlobal:2",
			kind: "jsGlobal",
			property: "___moinloader",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "moinai:jsGlobal:3",
			kind: "jsGlobal",
			property: "__moinrpc",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "moinai:jsGlobal:4",
			kind: "jsGlobal",
			property: "moin.addContext",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
