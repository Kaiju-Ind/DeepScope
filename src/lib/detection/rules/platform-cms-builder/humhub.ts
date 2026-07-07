import type { TechnologyDefinition } from '../../types';

export const humhubTechnologyDefinition = {
	id: "humhub",
	name: "HumHub",
	website: "https://www.humhub.com",
	description: "HumHub is a software platform that digitizes organizational processes by enabling structured internal communication, collaboration, and information sharing.",
	icon: "HumHub.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "humhub:jsGlobal:0",
			kind: "jsGlobal",
			property: "HumHubMentionProvider",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "humhub:jsGlobal:1",
			kind: "jsGlobal",
			property: "humhub.config",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
		cpe: "cpe:2.3:a:humhub:humhub:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
