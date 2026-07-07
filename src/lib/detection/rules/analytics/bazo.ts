import type { TechnologyDefinition } from '../../types';

export const bazoTechnologyDefinition = {
	id: "bazo",
	name: "Bazo",
	website: "https://bazo.io",
	description: "Bazo is a tool that identifies the company or organisation that visited your website and tracks its activities.",
	icon: "BazoIO.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "bazo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.bazo\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bazo:jsGlobal:1",
			kind: "jsGlobal",
			property: "_bazoq",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bazo:jsGlobal:2",
			kind: "jsGlobal",
			property: "_bazou",
			valuePattern: new RegExp("\\.bazo\\.io\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bazo:jsGlobal:3",
			kind: "jsGlobal",
			property: "_bazov",
			valuePattern: new RegExp("([\\d\\.]+)"),
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
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
