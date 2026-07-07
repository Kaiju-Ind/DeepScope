import type { TechnologyDefinition } from '../../types';

export const tapsellTechnologyDefinition = {
	id: "tapsell",
	name: "Tapsell",
	website: "https://tapsell.com",
	description: "Tapsell is an Iranian digital advertising platform that enables businesses to manage and deliver targeted ads across digital channels.",
	icon: "Tapsell.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "tapsell:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.mediaad\\.org"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
