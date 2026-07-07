import type { TechnologyDefinition } from '../../types';

export const zipteamsTechnologyDefinition = {
	id: "zipteams",
	name: "Zipteams",
	website: "https://zipteams.com",
	description: "Zipteams is a live chat solution.",
	icon: "Zipteams.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "zipteams:jsGlobal:0",
			kind: "jsGlobal",
			property: "ZipteamsWidget",
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
