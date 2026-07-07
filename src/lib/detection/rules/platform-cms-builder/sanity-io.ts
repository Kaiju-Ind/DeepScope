import type { TechnologyDefinition } from '../../types';

export const sanityIoTechnologyDefinition = {
	id: "sanity-io",
	name: "Sanity.io",
	website: "https://www.sanity.io",
	description: "Sanity is a platform for structured content. It comes with an open-source, headless CMS that can be customized with Javascript, a real-time hosted data store and an asset delivery pipeline.",
	icon: "Sanity.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sanity-io:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.sanity\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sanity-io:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("api(?:cdn)?\\.sanity\\.io"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "sanity-io:dom:2",
			kind: "dom",
			selector: "img[src*='cdn.sanity.io'],img[srcset*='cdn.sanity.io'],video[src*='cdn.sanity.io'],source[src*='cdn.sanity.io'],source[srcset*='cdn.sanity.io'],track[src*='cdn.sanity.io']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "sanity-io:header:3",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("cdn\\.sanity\\.io", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
