import type { TechnologyDefinition } from '../../types';

export const pianoTechnologyDefinition = {
	id: "piano",
	name: "Piano",
	website: "https://piano.io",
	description: "Piano is an enterprise SaaS company which specializing in advanced media business processes and ecommerce optimization.",
	icon: "Piano.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "piano:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tinypass\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "piano:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.piano\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "piano:jsGlobal:2",
			kind: "jsGlobal",
			property: "PianoESPConfig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "piano:jsGlobal:3",
			kind: "jsGlobal",
			property: "gciDataPiano",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "piano:jsGlobal:4",
			kind: "jsGlobal",
			property: "pianoAnalytics",
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
