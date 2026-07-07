import type { TechnologyDefinition } from '../../types';

export const messagegearsTechnologyDefinition = {
	id: "messagegears",
	name: "MessageGears",
	website: "https://messagegears.com/swrve/",
	description: "MessageGears is a cross-channel messaging platform designed to help businesses deliver communications across multiple channels from a single system.",
	icon: "MessageGears.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "messagegears:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.swrve\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
