import type { TechnologyDefinition } from '../../types';

export const parseLyTechnologyDefinition = {
	id: "parse-ly",
	name: "Parse.ly",
	website: "https://www.parse.ly",
	description: "Parse.ly is an analytics and content intelligence platform.",
	icon: "Parse.ly.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "parse-ly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.parsely\\.com/keys/[^/]+/p\\.js(?:\\?ver=([^&]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			confidence: 100,
			description: "Parse.ly loader script is declared on the page.",
		},
		{
			id: "parse-ly:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("cdn\\.parsely\\.com/keys/[^/]+/p\\.js(?:\\?ver=([^&]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			confidence: 100,
			description: "Parse.ly loader was observed in network/resource signals.",
		},
		{
			id: "parse-ly:resourceUrl:2",
			kind: "resourceUrl",
			pattern: new RegExp("cdn\\.parsely\\.com/keys/[^/]+/p\\.js(?:\\?ver=([^&]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			confidence: 100,
			description: "Parse.ly resource was observed by the browser performance timeline.",
		},
		{
			id: "parse-ly:jsGlobal:3",
			kind: "jsGlobal",
			property: "PARSELY",
			confidence: 95,
			description: "Page-owned Parse.ly global is present.",
		},
	],
} as const satisfies TechnologyDefinition;
