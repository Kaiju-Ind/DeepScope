import type { TechnologyDefinition } from '../../types';

export const openpanelTechnologyDefinition = {
	id: "openpanel",
	name: "OpenPanel",
	website: "https://openpanel.dev",
	description: "OpenPanel is an open-source analytics library that enables developers to track and analyze user behavior, providing real-time insights and data visualization for improved decision-making across various platforms.",
	icon: "OpenPanel.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "openpanel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/openpanel\\.dev\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "openpanel:jsGlobal:1",
			kind: "jsGlobal",
			property: "openpanel.api",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:openpanel:openpanel:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
