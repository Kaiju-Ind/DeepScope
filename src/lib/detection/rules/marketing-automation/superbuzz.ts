import type { TechnologyDefinition } from '../../types';

export const superbuzzTechnologyDefinition = {
	id: "superbuzz",
	name: "SuperBuzz",
	website: "https://www.superbuzz.io",
	description: "SuperBuzz is a platform that uses AI-powered campaigns to help businesses increase sales performance.",
	icon: "SuperBuzz.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "superbuzz:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.superbuzz\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "superbuzz:jsGlobal:1",
			kind: "jsGlobal",
			property: "SuperBuzzSDK",
			description: "Page-owned global matches a known technology marker.",
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
