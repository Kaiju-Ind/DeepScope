import type { TechnologyDefinition } from '../../types';

export const coveoTechnologyDefinition = {
	id: "coveo",
	name: "Coveo",
	website: "https://www.coveo.com/",
	description: "Coveo is an enterprise search and relevance platform that uses AI to enhance search capabilities and deliver personalized content across digital touchpoints.",
	icon: "Coveo.png",
	categories: [
		"search",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "coveo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.cloud\\.coveo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "coveo:jsGlobal:1",
			kind: "jsGlobal",
			property: "Coveo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "coveo:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.(?:cloud\\.coveo|goqubit)\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "coveo:jsGlobal:3",
			kind: "jsGlobal",
			property: "__qubit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "coveo:jsGlobal:4",
			kind: "jsGlobal",
			property: "onQubitReady",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
