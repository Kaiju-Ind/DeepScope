import type { TechnologyDefinition } from '../../types';

export const scayleTechnologyDefinition = {
	id: "scayle",
	name: "Scayle",
	website: "https://www.scayle.com",
	description: "Scayle is an enterprise ecommerce platform that uses a headless, API-first architecture to support flexible and scalable online retail operations.",
	icon: "Scayle.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "scayle:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.scayle\\.cloud"),
			description: "Script content contains a bounded technology signature.",
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
