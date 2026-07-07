import type { TechnologyDefinition } from '../../types';

export const getreviewTechnologyDefinition = {
	id: "getreview",
	name: "GetReview",
	website: "https://getreview.pl",
	description: "GetReview is a website reviews system designed to collect, manage, and display user feedback.",
	icon: "GetReview.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "getreview:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.getreview\\.pl"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "getreview:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("app\\.getreview\\.pl"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
