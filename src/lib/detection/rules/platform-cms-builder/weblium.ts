import type { TechnologyDefinition } from '../../types';

export const webliumTechnologyDefinition = {
	id: "weblium",
	name: "Weblium",
	website: "https://weblium.com",
	description: "Weblium let's you create a web site or online store without the need for a web developer or designer.",
	icon: "Weblium.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "weblium:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("res2\\.weblium\\.site\\/common\\/core\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "weblium:url:1",
			kind: "url",
			pattern: new RegExp("\\.weblium\\.site"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "weblium:dom:2",
			kind: "dom",
			selector: "link[href*='res2.weblium.site']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"node-js",
		"openresty",
		"react",
	],
} as const satisfies TechnologyDefinition;
