import type { TechnologyDefinition } from '../../types';

export const dockvineTechnologyDefinition = {
	id: "dockvine",
	name: "Dockvine",
	website: "https://dockvine.com",
	description: "Dockvine is a tool that enables visitors to browse social media pages within a website interface without navigating away.",
	icon: "Dockvine.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "dockvine:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.dockvine\\.com"),
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
