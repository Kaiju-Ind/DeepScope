import type { TechnologyDefinition } from '../../types';

export const checklyTechnologyDefinition = {
	id: "checkly",
	name: "Checkly",
	website: "https://www.checklyhq.com",
	description: "Checkly is the API and E2E monitoring platform for the modern stack: programmable, flexible and loving JavaScript.",
	icon: "Checkly.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "checkly:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("api\\.checklyhq\\.com\\/"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "checkly:jsGlobal:1",
			kind: "jsGlobal",
			property: "__NUXT__.config.public.apiUrl",
			valuePattern: new RegExp("api\\.checklyhq\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
	requires: [
		"nuxt-js",
	],
} as const satisfies TechnologyDefinition;
