import type { TechnologyDefinition } from '../../types';

export const elmTechnologyDefinition = {
	id: "elm",
	name: "Elm",
	website: "https://elm-lang.org/",
	description: "Elm is a statically typed functional programming language created by Evan Czaplicki in 2012 for building web applications.",
	icon: "elm.svg",
	categories: [
		"developer-tooling",
		"ui-library",
	],
	rules: [
		{
			id: "elm:jsGlobal:0",
			kind: "jsGlobal",
			property: "Elm.Main.embed",
			version: {
				source: "match",
				template: "0.18",
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "elm:jsGlobal:1",
			kind: "jsGlobal",
			property: "Elm.Main.init",
			version: {
				source: "match",
				template: "0.19",
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "elm:jsGlobal:2",
			kind: "jsGlobal",
			property: "Elm",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
