import type { TechnologyDefinition } from '../../types';

export const imbaTechnologyDefinition = {
	id: "imba",
	name: "Imba",
	website: "https://imba.io",
	description: "Imba is a Web programming language that compiles to performant JavaScript, providing language-level support for defining, extending, subclassing, and instantiating.",
	icon: "Imba.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "imba:jsGlobal:0",
			kind: "jsGlobal",
			property: "Imba",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "imba:jsGlobal:1",
			kind: "jsGlobal",
			property: "Imba.VERSION",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "imba:jsGlobal:2",
			kind: "jsGlobal",
			property: "imba",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
