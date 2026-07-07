import type { TechnologyDefinition } from '../../types';

export const upcontentTechnologyDefinition = {
	id: "upcontent",
	name: "UpContent",
	website: "https://www.upcontent.com",
	description: "UpContent is a content discovery tool that identifies, curates, and surfaces relevant articles and media from across the web for use in digital publishing and marketing workflows.",
	icon: "UpContent.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "upcontent:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.upcontent\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
