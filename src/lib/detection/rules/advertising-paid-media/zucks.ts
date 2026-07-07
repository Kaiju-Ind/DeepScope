import type { TechnologyDefinition } from '../../types';

export const zucksTechnologyDefinition = {
	id: "zucks",
	name: "Zucks",
	website: "https://zucks.co.jp",
	description: "Zucks is an advertising platform that connects advertisers with publishers seeking to place and manage digital advertisements across various channels.",
	icon: "Zucks.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "zucks:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.zucks\\.net"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
