import type { TechnologyDefinition } from '../../types';

export const exCoTechnologyDefinition = {
	id: "ex-co",
	name: "EX.CO",
	website: "https://ex.co",
	description: "EX. CO (formerly Playbuzz) is an online publishing platform for publishers, brand agencies, and individual content creators to create content in interactive formats such as polls, quizzes, lists, video snippets, slideshows, and countdowns.",
	icon: "EX.CO.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "ex-co:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ex\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ex-co:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.playbuzz\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ex-co:requestUrl:2",
			kind: "requestUrl",
			pattern: new RegExp("prd-collector-anon\\.ex\\.co"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "ex-co:jsGlobal:3",
			kind: "jsGlobal",
			property: "__EXCO",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ex-co:jsGlobal:4",
			kind: "jsGlobal",
			property: "__EXCO_INTEGRATION_TYPE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ex-co:jsGlobal:5",
			kind: "jsGlobal",
			property: "excoPixelUrl",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
