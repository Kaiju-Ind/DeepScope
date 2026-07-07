import type { TechnologyDefinition } from '../../types';

export const toplineProTechnologyDefinition = {
	id: "topline-pro",
	name: "Topline Pro",
	website: "https://www.toplinepro.com",
	description: "Topline Pro is an all-in-one platform designed to support marketing operations for home service businesses.",
	icon: "ToplinePro.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "topline-pro:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.toplinepro\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
