import type { TechnologyDefinition } from '../../types';

export const homebotTechnologyDefinition = {
	id: "homebot",
	name: "Homebot",
	website: "https://homebot.ai",
	description: "Homebot is a platform that converts client engagement into measurable financial transactions, enabling actionable insights and improved business outcomes.",
	icon: "Homebot.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "homebot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.homebotapp\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "homebot:jsGlobal:1",
			kind: "jsGlobal",
			property: "Homebot",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "homebot:jsGlobal:2",
			kind: "jsGlobal",
			property: "Homebot.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
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
