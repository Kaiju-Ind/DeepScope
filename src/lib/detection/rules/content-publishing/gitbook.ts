import type { TechnologyDefinition } from '../../types';

export const gitbookTechnologyDefinition = {
	id: "gitbook",
	name: "GitBook",
	website: "https://www.gitbook.com",
	description: "GitBook is a command-line tool for creating documentation using Git and Markdown.",
	icon: "GitBook.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "gitbook:url:0",
			kind: "url",
			pattern: new RegExp("^https?:\\/\\/[^/]+\\.gitbook\\.com\\/"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "gitbook:jsGlobal:1",
			kind: "jsGlobal",
			property: "__GITBOOK_INITIAL_PROPS__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gitbook:jsGlobal:2",
			kind: "jsGlobal",
			property: "__GITBOOK_INITIAL_STATE__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gitbook:jsGlobal:3",
			kind: "jsGlobal",
			property: "__GITBOOK_LAZY_MODULES__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gitbook:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("GitBook ([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "gitbook:meta:5",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("gitbook ([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:gitbook:gitbook:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
