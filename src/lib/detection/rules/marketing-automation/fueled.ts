import type { TechnologyDefinition } from '../../types';

export const fueledTechnologyDefinition = {
	id: "fueled",
	name: "Fueled",
	website: "https://fueled.io",
	description: "Fueled is a platform that manages and analyzes first-party data for ecommerce businesses to support insights and decision making.",
	icon: "Fueled.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "fueled:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("mb-cdn\\.fueled\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fueled:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("mb-cdn\\.fueled\\.io"),
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
