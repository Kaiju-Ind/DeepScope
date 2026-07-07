import type { TechnologyDefinition } from '../../types';

export const factFinderTechnologyDefinition = {
	id: "fact-finder",
	name: "Fact Finder",
	website: "https://fact-finder.com",
	description: "Fact Finder is a platform which, combines search, navigation, and merchandising solutions to streamline online search and power sales.",
	icon: "Fact Finder.png",
	categories: [
		"search",
	],
	rules: [
		{
			id: "fact-finder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("Suggest\\.ff"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fact-finder:html:1",
			kind: "html",
			pattern: new RegExp("<!-- Factfinder"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "fact-finder:url:2",
			kind: "url",
			pattern: new RegExp("(?:\\/ViewParametricSearch|ffsuggest\\.[a-z]htm)"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "fact-finder:jsGlobal:3",
			kind: "jsGlobal",
			property: "FactFinderInit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fact-finder:jsGlobal:4",
			kind: "jsGlobal",
			property: "factfinder",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fact-finder:jsGlobal:5",
			kind: "jsGlobal",
			property: "factfinder.version",
			valuePattern: new RegExp("^([\\d\\.])$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fact-finder:scriptSrc:6",
			kind: "scriptSrc",
			pattern: new RegExp("suggest\\.ff"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fact-finder:html:7",
			kind: "html",
			pattern: new RegExp("<!-- factfinder"),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
