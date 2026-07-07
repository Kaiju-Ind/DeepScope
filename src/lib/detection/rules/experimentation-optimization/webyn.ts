import type { TechnologyDefinition } from '../../types';

export const webynTechnologyDefinition = {
	id: "webyn",
	name: "Webyn",
	website: "https://www.webyn.ai",
	description: "Webyn is a SaaS platform employing AI to analyse website traffic and implement automated, personalised enhancements aimed at improving user experience and potentially increasing conversions for clients.",
	icon: "Webyn.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "webyn:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("files\\.webyn\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "webyn:dom:1",
			kind: "dom",
			selector: "link[href*='files.webyn.ai']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "webyn:jsGlobal:2",
			kind: "jsGlobal",
			property: "WebynInstance",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
