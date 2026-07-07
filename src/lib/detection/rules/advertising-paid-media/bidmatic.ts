import type { TechnologyDefinition } from '../../types';

export const bidmaticTechnologyDefinition = {
	id: "bidmatic",
	name: "Bidmatic",
	website: "https://bidmatic.io",
	description: "Bidmatic is a platform providing publisher-centric monetisation solutions, enabling publishers to manage their ad stack and maximise revenue through high-quality demand sources and advanced optimisation technology.",
	icon: "Bidmatic.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "bidmatic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.bidmatic\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bidmatic:jsGlobal:1",
			kind: "jsGlobal",
			property: "nobidVersion",
			valuePattern: new RegExp("([\\d.]+)"),
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
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
