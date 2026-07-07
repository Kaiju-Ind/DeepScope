import type { TechnologyDefinition } from '../../types';

export const tooltipTechnologyDefinition = {
	id: "tooltip",
	name: "Tooltip",
	website: "https://tooltip.io",
	description: "Tooltip is a web-based in-app messaging suite designed to enhance user engagement and communication within applications.",
	icon: "Tooltip.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "tooltip:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.tooltip\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
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
