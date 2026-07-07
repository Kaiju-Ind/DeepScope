import type { TechnologyDefinition } from '../../types';

export const raptorTechnologyDefinition = {
	id: "raptor",
	name: "Raptor",
	website: "https://raptorsmartadvisor.com",
	description: "Raptor is a personalisation engine based on machine learning that analyses and learns about the user's behavior and unique browser history.",
	icon: "Raptor.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "raptor:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.raptorsmartadvisor\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "raptor:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("msecnd\\.net\\/script\\/raptor-([\\d.]+)\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "raptor:jsGlobal:2",
			kind: "jsGlobal",
			property: "Raptor",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "raptor:jsGlobal:3",
			kind: "jsGlobal",
			property: "onRaptorLoaded",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "raptor:jsGlobal:4",
			kind: "jsGlobal",
			property: "raptorBase64",
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
