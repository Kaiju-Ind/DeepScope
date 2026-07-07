import type { TechnologyDefinition } from '../../types';

export const haddockTechnologyDefinition = {
	id: "haddock",
	name: "Haddock",
	website: "https://www.haskell.org/haddock/",
	description: "Haddock is a tool for automatically generating documentation from annotated Haskell source code.",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "haddock:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("haddock-util\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "haddock:html:1",
			kind: "html",
			pattern: new RegExp("<p>Produced by <a href=\"http:\\/\\/www\\.haskell\\.org\\/haddock\\/\">Haddock<\\/a> version ([0-9.]+)<\\/p>"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "haddock:html:2",
			kind: "html",
			pattern: new RegExp("<p>produced by <a href=\"http:\\/\\/www\\.haskell\\.org\\/haddock\\/\">haddock<\\/a> version ([0-9.]+)<\\/p>"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;
