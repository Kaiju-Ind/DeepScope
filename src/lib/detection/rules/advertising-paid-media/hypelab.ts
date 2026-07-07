import type { TechnologyDefinition } from '../../types';

export const hypelabTechnologyDefinition = {
	id: "hypelab",
	name: "HypeLab",
	website: "https://www.hypelab.com",
	description: "HypeLab is a platform that supports audience development by enhancing visibility, fostering recognition, and helping establish a loyal community.",
	icon: "HypeLab.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "hypelab:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.hypelab\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hypelab:jsGlobal:1",
			kind: "jsGlobal",
			property: "HypeLab.Environment",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
