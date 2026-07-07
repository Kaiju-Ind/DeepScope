import type { TechnologyDefinition } from '../../types';

export const netlifyTechnologyDefinition = {
	id: "netlify",
	name: "Netlify",
	website: "https://www.netlify.com/",
	description: "Netlify providers hosting and server-less backend services for web applications and static websites.",
	icon: "Netlify.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "netlify:url:0",
			kind: "url",
			pattern: new RegExp("^https?:\\/\\/[^/]+\\.netlify\\.(?:com|app)\\/"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "netlify:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("cdn\\.netlify\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "netlify:header:2",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^Netlify", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "netlify:header:3",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^netlify", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
