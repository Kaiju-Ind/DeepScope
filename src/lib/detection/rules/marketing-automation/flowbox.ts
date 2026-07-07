import type { TechnologyDefinition } from '../../types';

export const flowboxTechnologyDefinition = {
	id: "flowbox",
	name: "Flowbox",
	website: "https://getflowbox.com",
	description: "Flowbox is a platform designed to enable brands to use social content to grow engagement, drive revenue and sell more across their marketing and commerce channels.",
	icon: "Flowbox.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "flowbox:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.getflowbox\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "flowbox:jsGlobal:1",
			kind: "jsGlobal",
			property: "flowbox",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "flowbox:jsGlobal:2",
			kind: "jsGlobal",
			property: "flowboxWebpack",
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
