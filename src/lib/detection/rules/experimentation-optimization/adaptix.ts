import type { TechnologyDefinition } from '../../types';

export const adaptixTechnologyDefinition = {
	id: "adaptix",
	name: "Adaptix",
	website: "https://www.adaptix.ai",
	description: "Adaptix is a marketing automation platform that uses AI to help businesses create personalized customer experiences.",
	icon: "Adaptix.svg",
	categories: [
		"experimentation-optimization",
		"marketing-automation",
	],
	rules: [
		{
			id: "adaptix:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.adaptix\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adaptix:jsGlobal:1",
			kind: "jsGlobal",
			property: "AdaptixFormValidations",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adaptix:jsGlobal:2",
			kind: "jsGlobal",
			property: "AdaptixLang",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adaptix:jsGlobal:3",
			kind: "jsGlobal",
			property: "AdaptixSDK",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adaptix:jsGlobal:4",
			kind: "jsGlobal",
			property: "AdaptixSDKLoaded",
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
