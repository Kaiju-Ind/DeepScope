import type { TechnologyDefinition } from '../../types';

export const jsdelivrTechnologyDefinition = {
	id: "jsdelivr",
	name: "jsDelivr",
	website: "https://www.jsdelivr.com/",
	description: "JSDelivr is a free public CDN for open-source projects. It can serve web files directly from the npm registry and GitHub repositories without any configuration.",
	icon: "jsdelivr-icon.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "jsdelivr:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.jsdelivr\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jsdelivr:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("cdn\\.jsdelivr\\.net"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "jsdelivr:dom:2",
			kind: "dom",
			selector: "link[href*='cdn.jsdelivr.net']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
