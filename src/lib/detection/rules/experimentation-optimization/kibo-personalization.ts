import type { TechnologyDefinition } from '../../types';

export const kiboPersonalizationTechnologyDefinition = {
	id: "kibo-personalization",
	name: "Kibo Personalization",
	website: "https://kibocommerce.com/personalization-software",
	description: "Kibo Personalization is an omnichannel personalization software powered by machine learning to deliver individualized customer experiences and powered by Monetate and Certona.",
	icon: "Kibo.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "kibo-personalization:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.monetate\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kibo-personalization:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.baynote\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kibo-personalization:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\.certona\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kibo-personalization:jsGlobal:3",
			kind: "jsGlobal",
			property: "BaynoteAPI",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kibo-personalization:jsGlobal:4",
			kind: "jsGlobal",
			property: "BaynoteJSVersion",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kibo-personalization:jsGlobal:5",
			kind: "jsGlobal",
			property: "certona.recommendations",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kibo-personalization:jsGlobal:6",
			kind: "jsGlobal",
			property: "certonaRecommendations",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kibo-personalization:jsGlobal:7",
			kind: "jsGlobal",
			property: "monetate",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kibo-personalization:jsGlobal:8",
			kind: "jsGlobal",
			property: "monetateQ",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kibo-personalization:jsGlobal:9",
			kind: "jsGlobal",
			property: "monetateT",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
